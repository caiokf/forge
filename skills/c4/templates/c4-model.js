/* SAMPLE model — the generated artifact overwrites this file.
   Canonical data lives in c4-model.json; this file is that JSON wrapped as
   `window.C4_MODEL = ...;` so the viewer works from file:// (no fetch/CORS).
   Schema: references/html-diagram-design.md */
window.C4_MODEL = {
  "title": "Sample Platform",
  "diagrams": {
    "context": {
      "name": "Context Diagram", "type": "context", "parent": null,
      "nodes": [
        { "id": "customer", "kind": "actor", "name": "Customer", "x": 60, "y": 140 },
        { "id": "platform", "kind": "system", "name": "Commerce Platform", "tech": "Rails", "icon": "🛒",
          "scope": "internal", "x": 340, "y": 130, "childDiagram": "platform", "status": "live",
          "repo": { "name": "acme/commerce", "url": "https://github.com/acme/commerce" },
          "deployment": {
            "maturity": "automated", "iac": "terraform",
            "target": "AWS EKS", "detail": "acme-prod (us-east-1)",
            "tool": "GitHub Actions → ECR → helm upgrade",
            "links": [
              { "label": "infra/main.tf", "url": "https://github.com/acme/infra/blob/main/main.tf" },
              { "label": "EKS console", "url": "https://us-east-1.console.aws.amazon.com/eks/home?region=us-east-1#/clusters/acme-prod" }
            ]
          },
          "techDebt": 2,
          "description": "Core e-commerce system handling catalog, checkout and orders." },
        { "id": "stripe", "kind": "system", "name": "Stripe", "tech": "Stripe", "icon": "💳",
          "scope": "external", "x": 700, "y": 40, "description": "Third-party payment processing." },
        { "id": "mailer", "kind": "system", "name": "SendGrid", "tech": "SendGrid", "icon": "✉️",
          "scope": "external", "x": 700, "y": 230 }
      ],
      "groups": [],
      "edges": [
        { "from": "customer", "to": "platform", "label": "Browses & buys" },
        { "from": "platform", "to": "stripe", "label": "Charges cards" },
        { "from": "platform", "to": "mailer", "label": "Sends receipts" }
      ]
    },
    "platform": {
      "name": "Commerce Platform", "type": "container", "parent": "context",
      "nodes": [
        { "id": "customer2", "kind": "actor", "name": "Customer", "x": 40, "y": 180 },
        { "id": "web", "kind": "app", "name": "Storefront", "tech": "Next.js", "icon": "🌐",
          "group": "g-platform", "x": 340, "y": 120, "childDiagram": "storefront",
          "repo": { "name": "acme/storefront", "url": "https://github.com/acme/storefront" },
          "description": "Server-rendered storefront UI." },
        { "id": "api", "kind": "app", "name": "API", "tech": "Rails", "icon": "⚙️",
          "group": "g-platform", "x": 600, "y": 120,
          "repo": { "name": "acme/commerce", "url": "https://github.com/acme/commerce" } },
        { "id": "db", "kind": "store", "name": "Orders DB", "tech": "Postgres", "icon": "🗄️",
          "group": "g-platform", "x": 860, "y": 120 },
        { "id": "stripe2", "kind": "system", "name": "Stripe", "tech": "Stripe", "icon": "💳",
          "scope": "external", "x": 620, "y": 430 }
      ],
      "groups": [
        { "id": "g-platform", "name": "Commerce Platform", "tech": "Rails", "icon": "🛒",
          "x": 290, "y": 50, "w": 830, "h": 250 }
      ],
      "edges": [
        { "from": "customer2", "to": "web", "label": "Uses" },
        { "from": "web", "to": "api", "label": "JSON/HTTPS" },
        { "from": "api", "to": "db", "label": "Reads & writes" },
        { "from": "api", "to": "stripe2", "label": "Charges cards" }
      ]
    },
    "storefront": {
      "name": "Storefront", "type": "component", "parent": "platform",
      "nodes": [
        { "id": "pages", "kind": "component", "name": "Product Pages", "tech": "React", "icon": "🖼️",
          "group": "g-web", "x": 340, "y": 160,
          "references": [
            { "label": "app/products/[id]/page.tsx", "url": "https://github.com/acme/storefront/blob/main/app/products/%5Bid%5D/page.tsx" }
          ] },
        { "id": "cart", "kind": "component", "name": "Cart", "tech": "React", "icon": "🛒",
          "group": "g-web", "x": 620, "y": 160,
          "references": [
            { "label": "app/cart/", "url": "https://github.com/acme/storefront/tree/main/app/cart" },
            { "label": "lib/cart-store.ts", "url": "https://github.com/acme/storefront/blob/main/lib/cart-store.ts" }
          ] }
      ],
      "groups": [
        { "id": "g-web", "name": "Storefront", "tech": "Next.js", "icon": "🌐", "x": 300, "y": 90, "w": 590, "h": 250 }
      ],
      "edges": [
        { "from": "pages", "to": "cart", "label": "Add to cart" }
      ]
    }
  }
};
