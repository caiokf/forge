#!/usr/bin/env python3
"""Validate a c4-model.json against c4-model.schema.json plus the
cross-reference rules the schema cannot express.

Usage:
    python3 validate-model.py <path/to/c4-model.json> [--check-links]

    --check-links   also verify that relative repo/reference URLs point at
                    files/dirs that exist on disk (resolved against the
                    model file's directory, i.e. the artifact directory)

Exit code 0 = valid. Any findings are printed and exit code is 1.

Schema validation uses the `jsonschema` package when installed; otherwise a
built-in structural check (required fields, enums, unknown fields) runs, which
covers the same rules for this specific schema.
"""
import json, os, sys

SCHEMA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "c4-model.schema.json")

NODE_REQ = {"id", "kind", "name", "x", "y"}
NODE_KEYS = NODE_REQ | {"tech", "icon", "scope", "status", "group", "childDiagram", "description", "repo", "references", "deployment", "techDebt"}
DEPLOY_REQ = {"target"}
DEPLOY_KEYS = DEPLOY_REQ | {"method", "tool", "links"}
METHODS = {"manual", "iac", "ci-cd", "paas"}
GROUP_REQ = {"id", "name", "x", "y", "w", "h"}
GROUP_KEYS = GROUP_REQ | {"tech", "icon", "childDiagram", "description"}
EDGE_REQ = {"from", "to"}
EDGE_KEYS = EDGE_REQ | {"label"}
DIAGRAM_REQ = {"name", "type", "nodes", "edges"}
DIAGRAM_KEYS = DIAGRAM_REQ | {"parent", "groups"}
KINDS = {"system", "app", "store", "component", "actor"}
TYPES = {"context", "container", "component", "code"}
STATUSES = {"live", "future", "deprecated", "removed"}
SCOPES = {"internal", "external"}


def structural_fallback(model, errs):
    if not isinstance(model.get("title"), str) or not model.get("title"):
        errs.append("title: missing or empty")
    diagrams = model.get("diagrams")
    if not isinstance(diagrams, dict) or not diagrams:
        errs.append("diagrams: missing or empty")
        return
    for key, d in diagrams.items():
        p = f"diagrams.{key}"
        missing = DIAGRAM_REQ - d.keys()
        unknown = d.keys() - DIAGRAM_KEYS
        if missing: errs.append(f"{p}: missing {sorted(missing)}")
        if unknown: errs.append(f"{p}: unknown fields {sorted(unknown)}")
        if d.get("type") not in TYPES: errs.append(f"{p}.type: {d.get('type')!r} not in {sorted(TYPES)}")
        for i, n in enumerate(d.get("nodes", [])):
            np = f"{p}.nodes[{i}]({n.get('id','?')})"
            missing = NODE_REQ - n.keys(); unknown = n.keys() - NODE_KEYS
            if missing: errs.append(f"{np}: missing {sorted(missing)}")
            if unknown: errs.append(f"{np}: unknown fields {sorted(unknown)}")
            if n.get("kind") not in KINDS: errs.append(f"{np}.kind: {n.get('kind')!r} invalid")
            if "scope" in n and n["scope"] not in SCOPES: errs.append(f"{np}.scope: {n['scope']!r} invalid")
            if "status" in n and n["status"] not in STATUSES: errs.append(f"{np}.status: {n['status']!r} invalid")
            if "techDebt" in n and (not isinstance(n["techDebt"], int) or not 1 <= n["techDebt"] <= 4):
                errs.append(f"{np}.techDebt: {n['techDebt']!r} must be an integer 1-4")
            if "deployment" in n:
                dep = n["deployment"]
                if not isinstance(dep, dict):
                    errs.append(f"{np}.deployment: must be an object")
                else:
                    missing = DEPLOY_REQ - dep.keys(); unknown = dep.keys() - DEPLOY_KEYS
                    if missing: errs.append(f"{np}.deployment: missing {sorted(missing)}")
                    if unknown: errs.append(f"{np}.deployment: unknown fields {sorted(unknown)}")
                    if "method" in dep and dep["method"] not in METHODS:
                        errs.append(f"{np}.deployment.method: {dep['method']!r} not in {sorted(METHODS)}")
        for i, g in enumerate(d.get("groups", [])):
            gp = f"{p}.groups[{i}]({g.get('id','?')})"
            missing = GROUP_REQ - g.keys(); unknown = g.keys() - GROUP_KEYS
            if missing: errs.append(f"{gp}: missing {sorted(missing)}")
            if unknown: errs.append(f"{gp}: unknown fields {sorted(unknown)}")
        for i, e in enumerate(d.get("edges", [])):
            ep = f"{p}.edges[{i}]"
            missing = EDGE_REQ - e.keys(); unknown = e.keys() - EDGE_KEYS
            if missing: errs.append(f"{ep}: missing {sorted(missing)}")
            if unknown: errs.append(f"{ep}: unknown fields {sorted(unknown)}")


def cross_reference_checks(model, errs):
    diagrams = model.get("diagrams", {})
    roots = [k for k, d in diagrams.items() if not d.get("parent")]
    if len(roots) != 1:
        errs.append(f"expected exactly one root diagram (parent null/absent), found {len(roots)}: {roots}")
    reachable = set(roots)
    for key, d in diagrams.items():
        p = f"diagrams.{key}"
        if d.get("parent") and d["parent"] not in diagrams:
            errs.append(f"{p}.parent: {d['parent']!r} is not a diagram key")
        ids = [n["id"] for n in d.get("nodes", [])] + [g["id"] for g in d.get("groups", [])]
        dupes = {i for i in ids if ids.count(i) > 1}
        if dupes: errs.append(f"{p}: duplicate ids {sorted(dupes)}")
        idset = set(ids)
        group_ids = {g["id"] for g in d.get("groups", [])}
        for n in d.get("nodes", []) + d.get("groups", []):
            cd = n.get("childDiagram")
            if cd:
                if cd not in diagrams: errs.append(f"{p}/{n['id']}.childDiagram: {cd!r} is not a diagram key")
                else: reachable.add(cd)
        for n in d.get("nodes", []):
            if n.get("group") and n["group"] not in group_ids:
                errs.append(f"{p}/{n['id']}.group: {n['group']!r} is not a group id in this diagram")
        for i, e in enumerate(d.get("edges", [])):
            for end in (e.get("from"), e.get("to")):
                if end not in idset:
                    errs.append(f"{p}.edges[{i}]: endpoint {end!r} is not a node/group id in this diagram")
    unreachable = set(diagrams) - reachable
    if unreachable:
        errs.append(f"diagrams unreachable via childDiagram from the root: {sorted(unreachable)}")


def link_checks(model, base_dir, errs):
    for key, d in model.get("diagrams", {}).items():
        for n in d.get("nodes", []) + d.get("groups", []):
            items = []
            if n.get("repo"): items.append(n["repo"])
            items += n.get("references", [])
            items += (n.get("deployment") or {}).get("links", [])
            for item in items:
                url = item.get("url") if isinstance(item, dict) else item
                if url and not url.startswith(("http://", "https://")):
                    target = os.path.normpath(os.path.join(base_dir, url.split("#")[0]))
                    if not os.path.exists(target):
                        errs.append(f"diagrams.{key}/{n['id']}: link target does not exist: {url}")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__); sys.exit(2)
    model_path = args[0]
    model = json.load(open(model_path))
    errs = []

    try:
        import jsonschema
        schema = json.load(open(SCHEMA_PATH))
        validator = jsonschema.Draft202012Validator(schema)
        for e in sorted(validator.iter_errors(model), key=lambda e: list(e.absolute_path)):
            errs.append(f"schema: {'/'.join(map(str, e.absolute_path)) or '<root>'}: {e.message}")
    except ImportError:
        structural_fallback(model, errs)

    cross_reference_checks(model, errs)
    if "--check-links" in sys.argv:
        link_checks(model, os.path.dirname(os.path.abspath(model_path)), errs)

    if errs:
        print(f"INVALID — {len(errs)} finding(s):")
        for e in errs: print("  -", e)
        sys.exit(1)
    print("VALID")


if __name__ == "__main__":
    main()
