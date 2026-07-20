# Interactive HTML Diagram Design

Design language and interaction spec for generating interactive C4 diagram artifacts. The viewer is three **static** template files copied verbatim into the output directory — `templates/diagram.html` (→ `index.html`), `templates/diagram.css`, `templates/diagram.js` — plus one **generated** model: `c4-model.json` (canonical structured data) and `c4-model.js` (the same JSON wrapped as `window.C4_MODEL = ...;` so it loads from `file://`). This document is the source of truth when adjusting or extending those templates.

## Artifact Structure

```
<output-dir>/
├── index.html      # copied from templates/diagram.html — never edited
├── diagram.css     # copied verbatim — never edited
├── diagram.js      # copied verbatim — never edited
├── techs.js        # copied verbatim — technology icon catalog (window.C4_TECHS)
├── c4-model.json   # GENERATED: the structured C4 model (canonical artifact)
└── c4-model.js     # GENERATED: "window.C4_MODEL = " + contents of c4-model.json + ";"
```

Only the model files are project-specific. Regenerating a diagram means rewriting `c4-model.json` and re-deriving `c4-model.js`; viewer updates come from re-copying the three static files from the skill templates.

## Output Principles

- **Zero build steps** — opens from disk via `index.html`; fonts from Google Fonts CDN with system fallbacks.
- **One model holds all levels** — context, container, and component diagrams are entries in one model, connected by drill-down navigation (magnifier badge on any node/group with a `childDiagram`). Generate as many levels as the user asked for, and give *every* node at level N a child diagram at level N+1 whenever the source material supports it — drill-down depth is the product.
- **Dark professional aesthetic** — infinite dark canvas with subtle dot grid, card-style nodes, muted edges. Content glows; chrome recedes.
- **DOM nodes + SVG edges** — nodes are absolutely-positioned divs (easy text/icon layout), edges are one SVG layer underneath (easy curves/arrowheads). Both live in one pan/zoom "world" container.

## Design Tokens

### Neutral ramp (the workhorse — everything grey comes from here)

| Token        | Hex       | Used for                                   |
| ------------ | --------- | ------------------------------------------ |
| `rock-000`   | `#FFFFFF` | Node names, icon tiles, primary text       |
| `rock-050`   | `#F5F6F6` | Edge label text                            |
| `rock-200`   | `#CFD2D2` | Secondary UI text                          |
| `rock-300`   | `#ADB3B3` | Node captions, group captions              |
| `rock-400`   | `#838A8D` | Edge lines, arrowheads, muted icons        |
| `rock-500`   | `#595F61` | Group boundary borders                     |
| `rock-600`   | `#4C5152` | Hover borders on UI chrome                 |
| `rock-700`   | `#434647` | Node borders (idle)                        |
| `rock-800`   | `#323435` | Edge label pills, panels, chips            |
| `rock-900`   | `#1F2121` | Canvas background                          |
| `rock-925`   | `#161717` | Node card fill                             |
| `rock-950`   | `#0C0D0D` | Toolbar/top-bar fill                       |

### Accent + semantic

| Token      | Hex       | Used for                                        |
| ---------- | --------- | ----------------------------------------------- |
| `accent`   | `#73E5F6` | Hover outline, selection, highlighted edges     |
| `success`  | `#3FE99C` | Live status                                     |
| `warning`  | `#FF8811` | Deprecated status                               |
| `error`    | `#F07C7F` | Removed status                                  |
| `future`   | `#CB80F0` | Future/planned status                           |

### Categorical palette (technology/tag coloring, dark-tuned)

`blue #8CECFF · dark-blue #588AF7 · green #3FE99C · purple #CB80F0 · pink #FF72FC · red #F07C7F · orange #FF8811 · yellow #F5B841 · beaver #C6ADA3 · grey #CFD2D2 · white #FFFFFF`

Assign colors to technologies deterministically (hash of name → palette index) or explicitly per node.

### Typography

| Element            | Font                    | Size | Color      |
| ------------------ | ----------------------- | ---- | ---------- |
| Node name          | IBM Plex Sans, 500–600  | 16px | `#FFFFFF`  |
| Node caption       | IBM Plex Mono           | 10px | `#ADB3B3`  |
| Edge label         | IBM Plex Sans, 500      | 11px | `#F5F6F6`  |
| Group title        | IBM Plex Sans, 500      | 14px | `#FFFFFF`  |
| Group caption      | IBM Plex Mono           | 11px | `#ADB3B3`  |
| Toolbar/breadcrumb | IBM Plex Sans, 500      | 14px | `#FFFFFF`  |
| Details panel body | IBM Plex Sans           | 13px | `#CFD2D2`  |

Node captions are typed labels in mono: `System: GitHub`, `App: Rails`, `Store: Postgres`, `Actor`. Type capitalized, technology after a colon.

## Visual Spec

### Canvas

- Background `#1F2121` with a dot grid: 2px dots of `rgba(77,82,82,0.4)` on a 32px grid (CSS `radial-gradient` background, sized in world units so it pans/zooms with content).
- The world container uses `transform: translate(x,y) scale(s)`; grid lives on the world so it moves with the diagram.

### Node cards

- Fill `#161717`, border `1px solid #434647`, radius `6px`, subtle shadow `0 2px 4px -2px rgba(0,0,0,.06), 0 4px 6px -1px rgba(0,0,0,.1)`.
- Default size ~`180×72`; grows with content. Layout: icon left, name beside it, caption centered at bottom.
- **Icon resolution**: an explicit `icon` (emoji) renders in a `36×36` white tile; otherwise the node's `tech` is looked up in the technology catalog (`techs.js`, from `references/techs.json`) — case-insensitive against `name`, `nameShort`, and `slugs` — and the matching brand icon renders as a `34×34` rounded image (dark-theme variant, no tile). No explicit icon + no catalog match = text-only card. Prefer omitting `icon` whenever `tech` resolves in the catalog; use emojis for semantic components ("🔐 Auth") and anything the catalog lacks.
- **External-scope** nodes: fill `#ADB3B3`, text `#1F2121` (light card on dark canvas signals "not ours").
- **Actor** nodes: a small `28×28` white icon tile (person glyph) floating centered above a compact card; caption is just `Actor`.
- **Drill-down badge**: nodes/groups with a child diagram show a magnifier glyph (+ child count) in the top-left corner, always visible, `#838A8D` idle → `#73E5F6` on hover.
- Hover: border becomes `#73E5F6`, and 4 small connection dots appear at edge midpoints.
- Selected: border `#73E5F6` + 8 square resize handles (8×8, fill `#F5F6F6`, border `#ABAEB0`) — decorative in generated output but part of the look.

### Group boundaries (system/container scope boxes)

- Rounded rect radius `10px`, border `1px solid #595F61`, fill `rgba(255,255,255,0.04)`.
- Header row top-left *inside* the box: drill-down magnifier, small icon tile (20px), title.
- Caption centered at the *bottom edge* in mono: `System: Trigger`.
- Groups render beneath nodes; child nodes are positioned inside them.

### Edges

- Stroke `#838A8D`, width `1.5px`, gently curved (quadratic/cubic with perpendicular offset ~0.08× segment length; straight is acceptable fallback).
- Arrowhead at target: small filled triangle (`#838A8D`), ~8×6px, via SVG marker.
- Anchors: intersection of the center-to-center line with each node's border rect.
- **Label pills**: positioned at path midpoint. Fill `#323435`, radius `4px`, padding `4–6px 10px`, max-width `150px`, centered text, 2-line clamp.

### Selection & focus behavior

On node select: connected edges + their labels tint `#73E5F6`; every unconnected node, edge, and label dims to 25% opacity with a 0.15s transition. Canvas click or Esc clears.

### Chrome (floating UI over canvas)

- **Top bar**: floating rounded (8px) bar, fill `#0C0D0D`, height 48px — back/forward arrows, diagram breadcrumb (`Diagrams | <name>`), level badge (`Context` / `Container` / `Component`).
- **Details panel**: opens on select, right side, 320px, fill `#1B1C1D`, radius 12px, shadow `0 20px 24px -4px rgba(0,0,0,.3)`. Header: icon tile + name. Rows: Type, Scope, Technology, **Repo** (accent-colored link to the owning repository), Status as a pill (colored dot + label). Then Description, a **References** list (mono, accent links to source files/dirs — expected on component-level nodes), and "Open diagram →" when the node has a child diagram.
- **Overlay bar** (bottom-left): a tab row — **Technology · Deployment · IaC · Deploy Target · Tech Debt** — plus a chips row for the active tab. Chips are one per value present in the current diagram (`bg = color at 18% alpha`, `1px` border of the color, label + count). Technology, IaC, and Deploy Target values get categorical palette colors; Deployment maturity (Automated `#3FE99C`, Managed `#8CECFF`, Scripted `#F5B841`, Manual `#FF8811`) and Tech Debt (Pristine `#3FE99C`, Low `#F5B841`, Medium `#FF8811`, High `#F07C7F`) use fixed colors in fixed order. While an overlay is active every node shows a 3px underline bar in its value's color; hovering a chip dims non-matching nodes. Clicking the active tab toggles the overlay off.
- **Zoom controls** (bottom-right): − / percentage / + / ⛶ fit.

## Interaction Spec

| Input                        | Behavior                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| Wheel / trackpad scroll      | Zoom at cursor (0.2×–3×)                                        |
| Pinch (`Ctrl`+wheel)         | Zoom at cursor                                                  |
| Click + drag empty canvas    | Pan                                                             |
| Drag node                    | Move node; edges re-route live                                  |
| Click node                   | Select + details panel + connected-highlight/dim                |
| Click magnifier badge        | Drill down into child diagram                                   |
| Click canvas / `Esc`         | Deselect, close panel                                           |
| Breadcrumb / back arrow      | Navigate up / back through diagram history                      |
| `+` / `-` / `0`              | Zoom in / out / fit                                             |
| Double-click canvas          | Zoom in at cursor                                               |

Per-diagram view state (pan/zoom) is preserved when navigating between levels. Initial view = fit-to-content with 80px padding.

## Model Schema (`c4-model.json`)

```jsonc
{
  "title": "Acme Platform",
  "diagrams": {
    "context": {                            // key = diagram id, referenced by childDiagram/parent
      "name": "Context Diagram",
      "type": "context",                    // "context" | "container" | "component" | "code"
      "parent": null,                       // diagram key one level up (breadcrumb), null for root
      "nodes": [
        { "id": "user", "kind": "actor", "name": "Customer", "x": 80, "y": 120 },
        {
          "id": "web",
          "kind": "system",                 // "system" | "app" | "store" | "component" | "actor"
          "name": "Web App",
          "tech": "Rails",                  // shown in caption + technology legend
          "scope": "internal",              // "internal" | "external" (external = light card)
          "icon": "🌐",                     // emoji (or omit)
          "x": 320, "y": 110,
          "status": "live",                 // "live" | "future" | "deprecated" | "removed" (optional)
          "childDiagram": "web-app",        // enables the magnifier drill-down badge
          "group": "g1",                    // id of enclosing group box (optional)
          "description": "…",               // details panel prose (optional)
          "repo": {                         // details panel "Repo" link (optional)
            "name": "acme/web", "url": "https://github.com/acme/web"
          },
          "references": [                   // details panel source links (optional; use on
            {                               // component/code-level nodes)
              "label": "src/routes/checkout.ts",
              "url": "https://github.com/acme/web/blob/main/src/routes/checkout.ts"
            }
          ],
          "deployment": {                   // composite deployment facts (optional)
            "maturity": "automated",        // "automated" | "managed" | "scripted" | "manual"
            "iac": "terraform",             // "terraform" | "pulumi" | "cloudformation" | "cdk" |
                                            //   "kubernetes" | "helm" | "kustomize" | "ansible" |
                                            //   "docker-compose" | "platform-config" | "none"
            "target": "AWS EKS",            // required — SHORT + normalized (drives legend chips)
            "detail": "my-cluster (us-east-1)",           // free-text specifics for the panel
            "tool": "CodeBuild → ECR → kubectl rollout",  // pipeline description (optional)
            "links": [                      // deploy files + console/dashboard deep links
              { "label": "infra/main.tf", "url": "https://github.com/acme/infra/blob/main/main.tf" },
              { "label": "EKS console", "url": "https://us-east-1.console.aws.amazon.com/eks/home?region=us-east-1#/clusters/my-cluster" }
            ]
          },
          "techDebt": 2                     // 1 Pristine · 2 Low Debt · 3 Medium Debt · 4 High Debt
        }
      ],
      "groups": [                           // boundary boxes, rendered beneath nodes
        { "id": "g1", "name": "Web App", "tech": "Rails", "icon": "🌐",
          "x": 260, "y": 80, "w": 560, "h": 300, "childDiagram": "web-app" }
      ],
      "edges": [
        { "from": "user", "to": "web", "label": "Buys products" }   // label optional
      ]
    }
  }
}
```

Notes:
- **Prefer remote URLs** for `repo` and `references` — resolve them from the local checkout: `git remote get-url origin` (convert `git@host:org/repo.git` → `https://host/org/repo`) and the default branch from `git symbolic-ref --short refs/remotes/origin/HEAD`. Link files as `<remote>/blob/<branch>/<path>` and directories as `<remote>/tree/<branch>/<path>` (GitHub form; adjust for Bitbucket/GitLab). Fall back to relative local paths only when a repo has no remote.
- **Every internal node carries `repo`** — systems, containers, and components alike (components inherit their container's repo). Only external-scope nodes and actors go without.
- `references` items may also be plain strings (rendered as the link label and href).
- Every diagram other than the root should set `parent`; every node/group that has a corresponding deeper diagram should set `childDiagram` — that is what makes the magnifier drill-down appear.

## Technology Icon Catalog (`templates/techs.json`)

~2,900 technologies (AWS/Azure/GCP services, languages, frameworks, databases, SaaS) with brand icons hosted on a public CDN (Cloudflare Pages). Shape:

```jsonc
{
  "iconBase": "https://<icons-host>/",
  "technologies": [
    { "name": "Amazon Elastic Kubernetes Service (EKS)", "nameShort": "EKS",
      "slugs": ["amazon-elastic-kubernetes-service", "eks", …],
      "color": "orange", "type": "cloud-service", "provider": "aws",
      "icon": "<id>.png" }
  ]
}
```

Icon image URL = `iconBase + icon` (dark-theme variants — right for this dark UI). `templates/techs.json` is the canonical catalog; `templates/techs.js` is the same JSON wrapped as `window.C4_TECHS = …;` and is copied verbatim into every artifact (regenerate it after editing the JSON: `window.C4_TECHS = <json>;`). When writing `tech` values in the model, prefer names that resolve in this catalog (`PostgreSQL` not `pg16`, `TypeScript` not `TS` — unless the caption text matters more than the icon).

## Deployment & Tech Debt Guidance

**`deployment`** — discover from the repo: Dockerfiles, `k8s/` manifests, `terraform`/`pulumi` dirs, `buildspec.yml`, CI workflow files, `railway.toml`/`railway.json`, `vercel.json`, `wrangler.toml`, compose files. Three orthogonal facts, each its own overlay:

- **`maturity`** (Deployment overlay) — how the path to prod is driven: `automated` (CI/CD delivers on merge), `managed` (PaaS git-integration auto-deploys), `scripted` (one-command human-run deploys: `wrangler deploy`, `kubectl apply`, `terraform apply`), `manual` (hand steps, ssh, clickops). Fixed ladder colors: green / blue / yellow / orange.
- **`iac`** (IaC overlay) — what defines the infrastructure. Use `platform-config` for declarative PaaS config committed in the repo; `none` when nothing is versioned. When a Terraform-provisioned host runs a compose stack, put `terraform` on the host/system node and `docker-compose` on the containers inside it.
- **`target`** (Deploy Target overlay) — **short, normalized** values so chips aggregate: `AWS EKS`, `AWS EC2`, `Railway`, `Vercel`, `Cloudflare Workers`, `User devices`, `Local`, `CI`. Put cluster/namespace/region/hostname specifics in `detail`.

`links` should include the deploy files (remote URLs) **and** operational deep links: cloud console URLs (e.g. `https://<region>.console.aws.amazon.com/eks/home?region=<region>#/clusters/<name>`), PaaS dashboards. Components inherit their container's deployment — only set it where it differs.

**`techDebt`** rubric (estimate from evidence; cite the strongest signal in `description`):

| Value | Label       | Signals                                                                    |
| ----- | ----------- | -------------------------------------------------------------------------- |
| 1     | Pristine    | Spec/tests-first, current deps, no known hacks, clean boundaries           |
| 2     | Low Debt    | Minor gaps; production-worthy with small caveats                           |
| 3     | Medium Debt | Notable shortcuts: weak tests, SPOF coupling, monolith sprawl, aging deps  |
| 4     | High Debt   | Prototypes on mocks, dead/legacy code, unmaintained forks, security footguns, availability hacks |

## Validating the Model

The formal schema is `references/c4-model.schema.json`. Always validate the generated `c4-model.json` **before** assembling/refreshing the artifact:

```bash
python3 <skill>/references/validate-model.py <out>/c4-model.json --check-links
```

The script checks three layers and exits non-zero on any finding:

1. **Schema** — required fields, enums (`kind`, `type`, `status`, `scope`), and unknown-field typos, via the `jsonschema` package when installed or an equivalent built-in structural check otherwise
2. **Cross-references** (not expressible in JSON Schema) — exactly one root diagram; `parent` and `childDiagram` values are real diagram keys; all diagrams reachable from the root via drill-down; node `group` ids exist; edge endpoints exist; no duplicate ids within a diagram
3. **Links** (with `--check-links`) — relative `repo`/`references` URLs resolve to files/dirs that actually exist, relative to the model's directory

Fix findings in `c4-model.json`, re-run until `VALID`, then regenerate `c4-model.js`.

Layout guidance when generating coordinates: flow top-to-bottom or left-to-right following the primary user journey; ~120–180px gaps between ranks; actors at the periphery; external systems grouped on one side; group boxes sized with ~40px inner padding and headroom for the header row.
