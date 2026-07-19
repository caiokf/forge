# Interactive HTML Diagram Design

Design language and interaction spec for generating C4 diagrams as a single self-contained interactive HTML file. The implementation lives in three template files: `templates/c4-diagram.html` (skeleton + embedded `MODEL`), `templates/diagram.css` (tokens + styles), and `templates/diagram.js` (engine). To generate output: replace `MODEL` with the system being documented, then inline the CSS and JS into the HTML so the artifact is one portable file. This document is the source of truth when adjusting or extending those templates.

## Output Principles

- **One HTML file, zero build steps** — all CSS/JS inline, fonts from Google Fonts CDN with system fallbacks. Opens from disk.
- **One file holds all levels** — context, container (app), and component diagrams are separate "diagrams" in one embedded model, connected by drill-down navigation.
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
- Default size ~`180×72`; grows with content. Layout: icon tile left, name beside it, caption centered at bottom.
- Icon tile: `36×36`, white fill, radius `6px`, holds an emoji or inline SVG brand glyph (24px).
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
- **Details panel**: opens on select, right side, 320px, fill `#1B1C1D`, radius 12px, shadow `0 20px 24px -4px rgba(0,0,0,.3)`. Header: icon tile + name. Rows: Type, Scope, Technology, Description, plus "Open diagram →" when the node has a child diagram. Status as a pill (colored dot + label).
- **Overlay legend** (bottom-left): a row of chips, one per technology present, `bg = color at 18% alpha`, `1px` border of the color, label + count in the color. Hovering a chip highlights matching nodes (others dim); each node shows a 3px underline bar in its technology color when the legend is active.
- **Zoom controls** (bottom-right): − / percentage / + / ⛶ fit.

## Interaction Spec

| Input                        | Behavior                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| Wheel / trackpad scroll      | Pan (both axes)                                                 |
| `Ctrl`/`Cmd` + wheel, pinch  | Zoom at cursor (0.2×–3×)                                        |
| Drag empty canvas            | Pan                                                             |
| Drag node                    | Move node; edges re-route live                                  |
| Click node                   | Select + details panel + connected-highlight/dim                |
| Click magnifier badge        | Drill down into child diagram                                   |
| Click canvas / `Esc`         | Deselect, close panel                                           |
| Breadcrumb / back arrow      | Navigate up / back through diagram history                      |
| `+` / `-` / `0`              | Zoom in / out / fit                                             |
| Double-click canvas          | Zoom in at cursor                                               |

Per-diagram view state (pan/zoom) is preserved when navigating between levels. Initial view = fit-to-content with 80px padding.

## Embedded Model Shape

```js
const MODEL = {
  title: "Acme Platform",
  diagrams: {
    context: {
      name: "Context Diagram", type: "context", parent: null,
      nodes: [
        { id: "user",   kind: "actor",  name: "Customer", x: 80,  y: 120 },
        { id: "web",    kind: "system", name: "Web App",  tech: "Rails", scope: "internal",
          icon: "🌐", x: 320, y: 110, childDiagram: "web-app" },
        { id: "stripe", kind: "system", name: "Stripe",   tech: "Stripe", scope: "external",
          icon: "💳", x: 620, y: 110 }
      ],
      groups: [],
      edges: [
        { from: "user", to: "web",    label: "Buys products" },
        { from: "web",  to: "stripe", label: "Charges cards" }
      ]
    },
    "web-app": {
      name: "Web App — Container Diagram", type: "container", parent: "context",
      nodes: [ /* kind: "app" | "store" | "system" | "actor" | "component" */ ],
      groups: [ { id: "g1", name: "Web App", tech: "Rails", x: 260, y: 80, w: 560, h: 300 } ],
      edges: []
    }
  }
};
```

Layout guidance when generating coordinates: flow top-to-bottom or left-to-right following the primary user journey; ~120–180px gaps between ranks; actors at the periphery; external systems grouped on one side; group boxes sized with ~40px inner padding and headroom for the header row.
