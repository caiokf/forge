---
description: Provides C4 architecture documentation workflow guidance — generating comprehensive C4 docs from an existing codebase using bottom-up analysis. Use when documenting existing codebases for new team members, creating architecture overviews for stakeholders, generating API documentation, or building complete C4 documentation sets.
user-invocable: false
---

# C4 Architecture Documentation

This skill provides knowledge and workflow guidance for generating comprehensive C4 architecture documentation from an existing codebase using bottom-up analysis — from code level through components, containers, to system context.

## When to Use

This skill should be used when:

- Documenting an existing codebase for new team members
- Creating architecture overview for stakeholders
- Generating API documentation from code analysis
- Building a complete architecture documentation set

## Prerequisites

- Access to the codebase root directory
- Understanding of deployment structure (Docker, K8s, cloud services)
- Knowledge of external system integrations

## Workflow Overview

```
Phase 1: Code Level      →  Analyze directories bottom-up
Phase 2: Component Level →  Synthesize into logical components
Phase 3: Container Level →  Map to deployment units + APIs
Phase 4: Context Level   →  Create stakeholder-friendly overview
```

**Note**: Per the [C4 model](https://c4model.com/diagrams), most teams only need Context and Container diagrams. Generate all levels for completeness, but stop at any phase if sufficient.

## Phase Summaries

### Phase 1: Code-Level Documentation

Document every code directory from deepest to shallowest. For each directory, identify functions/methods, classes/modules, internal and external dependencies, and design patterns. Output: `c4-code-[directory-name].md` per directory.

### Phase 2: Component-Level Synthesis

Group code documentation into logical components by domain, technical, or organizational boundaries. Document responsibilities, interfaces, and dependencies. Create component index with master Mermaid diagram.

### Phase 3: Container-Level Synthesis

Map components to deployment units by analyzing Dockerfiles, K8s manifests, Terraform configs, etc. Document container APIs with OpenAPI specifications. Create container diagram.

### Phase 4: Context-Level Documentation

Create stakeholder-friendly system overview. Identify all personas (human and programmatic), document system features and user journeys, map external dependencies. Create context diagram.

## Output Structure

```
C4-Documentation/
├── c4-context.md              # Level 1: System context (start here)
├── c4-container.md            # Level 2: Deployment architecture
├── c4-component.md            # Level 3: Component index
├── c4-component-[name].md     # Level 3: Individual components
├── c4-code-[name].md          # Level 4: Code-level docs
├── c4/                        # Optional: interactive HTML diagram (all levels)
│   ├── index.html             #   static viewer, copied from skill templates
│   ├── diagram.css            #   static, copied verbatim
│   ├── diagram.js             #   static, copied verbatim
│   ├── c4-model.json          #   GENERATED structured C4 model (canonical)
│   └── c4-model.js            #   GENERATED: window.C4_MODEL = <json>;
└── apis/
    └── [container]-api.yaml   # OpenAPI specs
```

## Interactive HTML Output

When asked to generate C4 diagrams **in HTML form**, produce an interactive drill-down diagram artifact — instead of (or alongside) Mermaid diagrams.

1. **Ask how many levels** the user wants before modeling, unless they already said: 1 = context only, 2 = + containers, 3 = + components, 4 = + code. Model every requested level: each node at level N gets a `childDiagram` at level N+1 whenever the codebase/docs support it, so the magnifier drill-down goes as deep as requested
2. Read `references/html-diagram-design.md` for the design language, model schema, and interaction spec
3. Analyze the architecture and write **`c4-model.json`** — the canonical structured model conforming to `references/c4-model.schema.json`. Every internal node at every level (systems, containers, AND components) gets a `repo` link; component-level nodes additionally get `references` (source file/dir links). Use **remote URLs** (GitHub/Bitbucket, from `git remote get-url origin` + default branch, `blob/` for files and `tree/` for dirs); fall back to relative local paths only when no remote exists. Also set on every internal node:
   - **`deployment`** — three orthogonal facts plus evidence: `maturity` (`automated`/`managed`/`scripted`/`manual` — how the path to prod is driven), `iac` (`terraform`/`pulumi`/`cloudformation`/`cdk`/`kubernetes`/`helm`/`kustomize`/`ansible`/`docker-compose`/`platform-config`/`none` — what defines the infra), `target` (short normalized: "AWS EKS", "Railway", "Vercel", "User devices"…) with specifics in `detail`, `tool` (pipeline description), and `links` (deploy files as remote URLs, cloud console deep links, PaaS dashboards). Discover from Dockerfiles, k8s manifests, terraform/pulumi dirs, buildspecs, CI workflows, `railway.toml`/`vercel.json`. Components inherit their container's deployment — set it on components only when it differs
   - **`techDebt`** — estimate 1–4 (1 Pristine, 2 Low, 3 Medium, 4 High) from evidence: test coverage, dead/legacy code, mock-backed prototypes, hard-coded workarounds, unmaintained forks, availability hacks, dependency age. Note the strongest signal in the node's `description`
4. **Validate before assembling**: run `python3 references/validate-model.py <out>/c4-model.json --check-links` and fix findings until it prints `VALID` (checks schema conformance, drill-down/edge referential integrity, and that relative links exist on disk)
5. Assemble the output directory:
   - Copy `templates/diagram.html` → `<out>/index.html`, and `templates/diagram.css`, `templates/diagram.js`, `templates/techs.js` **verbatim** (never edit the copies)
   - Derive `<out>/c4-model.js` as `window.C4_MODEL = ` + the JSON + `;`
6. Verify by opening `index.html` in a browser: drill-down from context to the deepest level, click nodes to check Repo/References/Deploy links resolve, toggle the Technology/Deployment/Tech Debt overlay tabs

## Success Criteria

- Every code directory has a `c4-code-*.md` file
- Code docs include complete function signatures and dependencies
- Components have clear boundaries and responsibilities
- Component index includes relationship diagram
- Containers map to actual deployment units
- Container APIs have OpenAPI specifications
- Context includes all personas (human + programmatic)
- User journeys documented for key features
- All external dependencies identified
- Mermaid diagrams render correctly at each level
- Documentation links work between levels

## Configuration Options

| Option             | Default                         | Description                    |
| ------------------ | ------------------------------- | ------------------------------ |
| `target_directory` | repo root                       | Root directory to analyze      |
| `output_directory` | C4-Documentation/               | Where to write docs            |
| `exclude_patterns` | node_modules, .git, build, dist | Directories to skip            |
| `include_tests`    | true                            | Analyze test files for context |
| `api_format`       | openapi                         | Format for API specs           |
| `levels`           | all                             | Which C4 levels to generate    |

## Tips

- **Start with Context**: Even if generating bottom-up, review `c4-context.md` first for the big picture
- **Skip Code level for simple areas**: Only generate `c4-code-*.md` for complex modules
- **Update incrementally**: Re-run on changed directories rather than full regeneration
- **Review with stakeholders**: Context diagram should make sense to non-technical people
- **Validate APIs**: Test generated OpenAPI specs with Swagger UI or similar tools

## References

| File                                   | Content                                                                |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `references/workflow-phases.md`        | Detailed tasks and actions for each phase                              |
| `references/documentation-patterns.md` | C4 documentation templates, Mermaid syntax, and validation checklists  |
| `references/html-diagram-design.md`    | Design tokens, model schema, and interaction spec for HTML output      |
| `references/c4-model.schema.json`      | JSON Schema for `c4-model.json`                                        |
| `references/validate-model.py`         | Validator: schema + referential integrity + link existence             |
| `templates/diagram.html`               | Static viewer shell — copy to output as `index.html`                   |
| `templates/diagram.css`                | Static stylesheet — copy verbatim                                      |
| `templates/diagram.js`                 | Static engine (rendering, zoom/pan, drill-down, overlays) — copy verbatim |
| `templates/techs.json`                 | Technology icon catalog (~2,900 techs, CDN-hosted icons) — canonical   |
| `templates/techs.js`                   | Same catalog as static viewer asset (`window.C4_TECHS`) — copy verbatim |
| `templates/c4-model.js`                | Sample model showing the schema (output overwrites with generated one) |
