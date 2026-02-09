# Forge — Software Architecture Discovery Toolkit

Forge is a facilitation toolkit for running collaborative software architecture discovery and modeling sessions. It helps software architects, tech leads, and development teams explore domains, discover boundaries, and design event-driven systems through structured, interactive workshops.

## When to Use Forge

Use forge when you need to:

- **Explore a new domain** — You're starting a greenfield project or entering unfamiliar territory
- **Untangle a complex system** — Legacy systems, big ball of mud, unclear boundaries
- **Align the team** — Get developers, domain experts, and stakeholders on the same page
- **Design event-driven architectures** — Model commands, events, aggregates, and projections
- **Identify failure modes** — Understand what can go wrong and how to build resilience
- **Define service boundaries** — Split monoliths or design microservices with clear contexts

## Available Commands

### Ideation & Definition

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/brainstorm` | Multi-agent ideation with strategic, pragmatic, and creative perspectives | Starting with a vague idea, exploring possibilities, getting unstuck |
| `/define` | Product definition facilitation — transform fuzzy ideas into clear product specs | New product/feature from scratch, validating concepts before implementation |

### Domain Discovery

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/discovery` | Open-ended domain exploration — understand the problem space | New project with unfamiliar domain, onboarding to existing system |
| `/storm` | Event Storming — discover domain events, commands, and aggregates | Understanding complex business processes, identifying aggregate boundaries |
| `/context` | Bounded Context Mapping — define service boundaries and relationships | Decomposing monoliths, designing microservices, resolving ownership conflicts |

### System Design

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/model` | Event Modeling — design full system blueprint from UI to persistence | Translating domain events into implementation specs, CQRS/event-sourced systems |
| `/workflow` | BPMN Workflow Discovery — model business processes iteratively | Process needs fleshing out, finding the right granularity, cross-team workflows |
| `/c4-architecture` | Generate C4 architecture documentation from codebase analysis | Documenting existing codebases, creating architecture overview for stakeholders |

### Production Readiness

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/residuality` | Stressor analysis — identify failure modes and resilience patterns | Preparing for production, designing for high availability, post-incident reviews |

## How Forge Works

Forge acts as your **facilitation partner**, not a lecturer. Each session is:

1. **Interactive** — Claude asks questions, you provide domain knowledge
2. **Incremental** — We build understanding step by step
3. **Artifact-driven** — Each session produces markdown documents you can save and version
4. **Adaptable** — Sessions flex based on what emerges in conversation

## Session Flow

A typical forge session follows this pattern:

```
1. Context Setting    → What system/domain are we exploring?
2. Participant Check  → Who has domain knowledge? What perspectives do we need?
3. Guided Discovery   → Facilitated questions and collaborative exploration
4. Synthesis          → Organize findings into structured artifacts
5. Review & Refine    → Validate outputs, identify gaps, plan next steps
```

## Outputs

Forge sessions produce markdown artifacts stored in your project:

- **Brainstorm summaries** with distilled ideas, key insights, and next steps
- **Product definitions** with core value proposition, feature boundaries, and success criteria
- **Domain summaries** with concepts, workflows, business rules, and ubiquitous language
- **Event storm boards** with sticky-note style events, commands, actors, and aggregates
- **Event model timelines** showing the full system flow from UI to persistence
- **BPMN workflow diagrams** (.bpmn files) modeling business processes at multiple levels
- **C4 architecture documentation** at context, container, component, and code levels
- **Context maps** showing bounded contexts and their relationships
- **Stressor maps** identifying failure modes, mitigations, and resilience patterns

## Getting Started

Start with the session type that matches your current need:

- **Have a vague idea?** → `/brainstorm` to explore from multiple angles
- **Need to define a product?** → `/define` to transform ideas into clear specs
- **Just starting?** → `/discovery` to explore the problem space
- **Know the domain, need events?** → `/storm` to discover domain events
- **Ready to design?** → `/model` to create a detailed event model
- **Need to model a process?** → `/workflow` to create BPMN diagrams iteratively
- **Splitting a monolith?** → `/context` to map bounded contexts
- **Documenting existing code?** → `/c4-architecture` to generate architecture docs
- **Building for production?** → `/residuality` to stress-test your design

## Example Workflow: New Feature Development

Here's how you might use multiple commands together when building a new feature:

```
1. /brainstorm
   └─► "I have an idea for a subscription billing system"
   └─► Get strategic, pragmatic, and creative perspectives
   └─► Output: Refined concept with key considerations
       ↓
2. /define
   └─► Transform the brainstorm output into a clear product definition
   └─► Challenge assumptions, make tradeoffs, define scope
   └─► Output: Product definition document with must-haves vs nice-to-haves
       ↓
3. /discovery
   └─► Explore the billing domain deeply
   └─► Identify core concepts, workflows, business rules, pain points
   └─► Output: Domain summary with recommended next steps
       ↓
4. /storm
   └─► Discover domain events: SubscriptionCreated, PaymentProcessed, etc.
   └─► Identify commands, actors, aggregates, and policies
   └─► Output: Event storming board with timeline
       ↓
5. /model
   └─► Design the full system: UI → Commands → Events → Read Models
   └─► Create Given-When-Then specifications
   └─► Output: Complete event model ready for implementation
       ↓
6. /residuality
   └─► Identify stressors: What if payment gateway fails? What about retries?
   └─► Design circuit breakers, fallbacks, degradation strategies
   └─► Output: Stressor map with mitigation patterns
```

### Alternative Paths

Not every project needs all commands. Here are common shorter paths:

**Documenting an existing system:**
```
/c4-architecture → Generate docs from code analysis
```

**Modeling a specific business process:**
```
/workflow → Discover and model BPMN diagrams iteratively
```

**Splitting a monolith:**
```
/discovery → /context → /residuality
```

**Quick feature design (familiar domain):**
```
/storm → /model
```
