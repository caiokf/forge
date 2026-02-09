---
name: context
description: Facilitates a Domain-Driven Design bounded context mapping session to identify, define, and relate contexts within a domain. Use when decomposing a monolith into microservices, designing service boundaries, analyzing existing system boundaries, resolving model ownership conflicts between teams, planning system integrations, or establishing team topologies. Guides discovery of linguistic boundaries, context classification (core/supporting/generic), data ownership, relationship patterns (Partnership, Customer-Supplier, ACL), and event flows.
template: context-map.md
tags: [bounded-context, ddd, microservices]
---

# /context — Bounded Context Mapping Facilitation

## Purpose

Facilitate a Bounded Context Mapping session to identify, define, and relate bounded contexts within a domain. Based on Domain-Driven Design concepts, this session helps teams establish clear boundaries between different models and understand how they interact.

## When to Use

- Decomposing a monolith into services
- Designing microservices architecture from scratch
- Understanding an existing system's implicit boundaries
- Resolving conflicts between teams over model ownership
- Planning integration between systems or teams
- Establishing team topologies and ownership

## Session Flow

> **Current vs. Target State**: Throughout this session, be explicit about whether you're mapping how things ARE today or how they SHOULD be. Use solid lines for current boundaries, dashed for proposed. Document both when they differ.

### Phase 1: Set the Stage (2-3 exchanges)

Establish the scope and current state:

```
FACILITATOR PROMPTS:
- "What's the overall domain or system we're mapping?"
- "Is this an existing system we're analyzing or a new design?"
- "What teams or groups are involved in this domain?"
- "Are there existing service boundaries or is it a monolith?"

FOR LARGE DOMAINS (>6-8 potential contexts):
- "This is a large domain. Let's identify major clusters first."
- "Which area is most urgent or causing the most pain?"
- "We may need multiple sessions — let's focus on [priority area] today."
```

### Phase 2: Domain Exploration (5-7 exchanges)

Understand the full landscape before drawing boundaries:

```
FACILITATOR PROMPTS:
- "What are the major business capabilities in this domain?"
- "Walk me through the core workflows — what are the main things users do?"
- "What are the key nouns — the entities and concepts people talk about?"
- "Are there different meanings for the same word in different areas?"
- "Where do you see natural clustering of concepts and behaviors?"

FOR EXISTING SYSTEMS (Brownfield):
- "Where are the natural seams in the current codebase?"
- "Are there implicit boundaries already forming — modules that don't talk to each other?"
- "What shared databases or tables span multiple concerns today?"
- "Where is the 'big ball of mud' — tightly coupled areas that are painful to change?"

DEPTH PROMPTS (when answers are surface-level):
- "You mentioned [capability]. What makes that hard? Where does it get complicated?"
- "What rules or policies govern [behavior]? Who enforces them?"
- "When things go wrong with [process], how do you fix it?"
```

### Phase 3: Linguistic Boundaries (5-7 exchanges)

Identify where language changes — the key signal for context boundaries:

```
FACILITATOR PROMPTS:
- "You mentioned [Term] — does that mean the same thing everywhere?"
- "When Sales says 'Customer' and Support says 'Customer' — same thing?"
- "Where do you see translation happening between teams or areas?"
- "What terms are contested or confusing across the organization?"
- "Are there concepts that exist in one area but not another?"
```

Document language variations:

| Term     | Context A Meaning | Context B Meaning    |
| -------- | ----------------- | -------------------- |
| Customer | Person who buys   | Account with tickets |
| Order    | Purchase intent   | Fulfillment request  |

### Phase 4: Context Identification (5-7 exchanges)

Draw the context boundaries:

```
FACILITATOR PROMPTS:
- "Based on the language differences, what bounded contexts emerge?"
- "What name captures the essence of this context?"
- "What's the core responsibility of this context?"
- "What concepts live inside this boundary?"
- "What does this context NOT care about?"

IS THIS CURRENT OR TARGET STATE?
- "Is this boundary how things work today, or how you want them to work?"
```

For each context, capture:

- **Name**: Clear, business-meaningful name
- **Core Domain Concepts**: The entities and value objects inside
- **Responsibilities**: What this context owns and decides
- **Team Ownership**: Who builds and maintains this

### Phase 5: Boundary Rationale (3-5 exchanges)

Understand WHY boundaries exist, not just where:

```
FACILITATOR PROMPTS:
- "Beyond language differences, why should [Context A] be separate from [Context B]?"
- "What would break if we merged these two contexts?"
- "Does this context need to scale, deploy, or change independently?"
- "Are there security, compliance, or data privacy reasons for this boundary?"
- "Is this boundary serving the business or just reflecting historical accidents?"

DOCUMENT THE FORCES:
- Independence drivers: What needs to vary independently?
- Compliance factors: Regulatory or security constraints
- Operational needs: Scaling, availability, deployment frequency
- Organizational factors: Team autonomy, vendor boundaries
```

### Phase 6: Context Classification (3-5 exchanges)

Classify each context by strategic importance:

```
FACILITATOR PROMPTS:
- "Is [Context] core to your competitive advantage, or supporting?"
- "Would you build this in-house or could you buy/outsource it?"
- "Where should you invest the most design effort?"
- "Which contexts are legacy that you'd like to eventually replace?"
```

Categories:

- **Core Domain**: Competitive advantage, invest heavily
- **Supporting Subdomain**: Necessary but not differentiating
- **Generic Subdomain**: Commodity, consider buying

### Phase 7: Data Ownership (3-5 exchanges)

Establish clear data sovereignty:

```
FACILITATOR PROMPTS:
- "For [Entity], which context is the source of truth?"
- "Who creates this data? Who can modify it? Who just reads it?"
- "If this data needs to change, where does the change originate?"
- "Are there entities that are co-owned today? How do you resolve conflicts?"
- "Where do you have data duplication, and is it intentional?"
```

Create a data ownership summary:

| Entity | Source of Truth | Writers | Readers |
|--------|-----------------|---------|---------|
| Customer | Identity | Identity | Orders, Support |
| Order | Orders | Orders | Shipping, Billing |

### Phase 8: Relationship Mapping (7-10 exchanges)

Define how contexts interact and depend on each other:

```
FACILITATOR PROMPTS:
- "How does [Context A] interact with [Context B]?"
- "Who's upstream and who's downstream in this relationship?"
- "When [Context A] changes, does [Context B] have to change too?"
- "Is there a power dynamic — who dictates the interface?"
- "How do these teams collaborate in practice?"
```

Relationship patterns to identify:

| Pattern                   | Description                       | Power Dynamic                | When to Use                  |
| ------------------------- | --------------------------------- | ---------------------------- | ---------------------------- |
| **Partnership**           | Mutual dependency, joint planning | Equal power, both must agree | Close collaboration needed   |
| **Customer-Supplier**     | Upstream serves downstream needs  | Downstream can influence upstream | Clear service relationship   |
| **Conformist**            | Downstream adopts upstream model  | Upstream has all power       | Can't influence upstream     |
| **Anti-Corruption Layer** | Translate between models          | Downstream invests in isolation | Protect from external models |
| **Shared Kernel**         | Shared code/model subset          | Both must coordinate changes | Tight coupling acceptable    |
| **Open Host Service**     | Published API for many consumers  | Provider defines interface   | Platform/service provider    |
| **Published Language**    | Standard interchange format       | Standard defines interface   | Industry standards exist     |
| **Separate Ways**         | No integration                    | Full independence            | Independence more valuable   |

For each relationship:

```
FACILITATOR PROMPTS:
- "What pattern best describes the [A]-[B] relationship?"
- "What's the integration mechanism — API, events, shared database?"
- "What contract exists between these contexts?"
- "What happens when the upstream context is unavailable?"
```

### Phase 9: External Systems (3-5 exchanges)

Map third-party and external dependencies:

```
FACILITATOR PROMPTS:
- "What external systems, APIs, or third-party services do you integrate with?"
- "For each external system, which internal context owns that integration?"
- "What happens when [External System] is down or changes its API?"
- "Are there industry standards (Published Language) you must conform to?"
- "Where do you need Anti-Corruption Layers to insulate from external changes?"
```

### Phase 10: Event Flows (3-5 exchanges)

Map domain events that flow between contexts:

```
FACILITATOR PROMPTS:
- "What significant business events occur in [Context]?"
- "When [Event] happens, who needs to know? What do they do with it?"
- "Are there event chains — one event triggering another?"
- "What ordering constraints exist between events?"
- "What happens if an event is lost or processed out of order?"
```

### Phase 11: Team Alignment (3-5 exchanges)

Map contexts to team structure:

```
FACILITATOR PROMPTS:
- "Which team owns [Context]?"
- "Are there contexts that span multiple teams? Is that intentional?"
- "Does the team structure match the context boundaries?"
- "Where do you see coordination overhead between teams?"
- "Would different boundaries reduce cross-team dependencies?"
```

### Phase 12: Boundary Validation (3-5 exchanges)

Test boundaries with concrete scenarios:

```
FACILITATOR PROMPTS:
- "Let's test these boundaries. Walk me through [concrete scenario]."
- "A customer places an order, requests a refund, then disputes. How does each context participate?"
- "Which context handles [edge case]? Is that clear or ambiguous?"
- "If these boundaries existed, what question would still be unclear?"
```

### Phase 13: Synthesis (2-3 exchanges)

Wrap up and produce the artifact:

```
FACILITATOR PROMPTS:
- "Let me compile the context map. Does this capture the landscape?"
- "What boundary changes or migrations are needed?"
- "What integration work is highest priority?"
- "What's the first step — what can we do this quarter?"
```

## Output Artifact

Generate a markdown document using `templates/context-map.md` containing:

1. **Domain overview** — the system we mapped
2. **Bounded contexts** — each context with its details
3. **Context classification** — core, supporting, generic
4. **Data ownership** — source of truth for key entities
5. **Ubiquitous language by context** — glossary per context
6. **Context map diagram** — visual representation
7. **Relationship inventory** — all relationships with patterns
8. **External systems** — third-party integrations
9. **Event flows** — domain events across boundaries
10. **Integration specifications** — technical details
11. **Team alignment** — ownership and gaps
12. **Recommendations** — boundary changes and migration path

## Handling Common Situations

### When Boundaries Are Contested
- "Let's explore both options. What would we gain if [Boundary A]? What would we lose?"
- "What concrete scenario would help us decide which boundary is better?"
- "Is this a permanent decision or can we start with one and evolve?"
- "Let's capture both perspectives and mark this as 'needs validation.'"

### When Contexts Seem to Overlap
- "Both contexts need [Concept]. What attributes does each actually need?"
- "Is this overlap or the same concept viewed through different lenses?"
- "Could one context be the source of truth while others get projected views?"
- "Is a Shared Kernel appropriate, or would translation be safer?"

### When You're Uncertain
- "It's okay to mark this boundary as 'provisional — needs validation.'"
- "What would we need to learn to be confident about this boundary?"
- "Let's document the uncertainty: 'Could be one context or two, depending on [factor].'"

### When Sessions Go Sideways
- If stuck on one boundary: "Let's park this and come back. What other boundaries are clearer?"
- If drowning in detail: "We're in the weeds. What's the one-sentence summary?"
- If earlier context was wrong: "We've learned something. Let's update before continuing."
- If two people are looping: "I'm hearing two perspectives. Let's capture both and move on."

## Context Map Diagram Format

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────┐         Partnership        ┌──────────────┐ │
│   │              │◄──────────────────────────►│              │ │
│   │   Orders     │                            │   Payments   │ │
│   │   (Core)     │                            │  (Support)   │ │
│   └──────────────┘                            └──────────────┘ │
│          │                                           ▲         │
│          │ Customer-Supplier                         │         │
│          ▼                                           │         │
│   ┌──────────────┐                            ┌──────────────┐ │
│   │              │         Conformist         │              │ │
│   │   Shipping   │───────────────────────────►│   Billing    │ │
│   │  (Support)   │                            │  (Generic)   │ │
│   └──────────────┘                            └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Facilitation Tips

- Follow the language — where words change meaning, boundaries exist
- Contexts are about models, not about code or databases
- Teams should own whole contexts, not parts of contexts
- Smaller contexts are easier to maintain but create integration overhead
- Not every relationship needs an ACL — sometimes conforming is fine
- Context boundaries often reveal organizational dysfunction
- The map reflects reality first, aspiration second — be honest about current state
- Mark uncertain boundaries as provisional — it's okay to not know yet
- Power dynamics matter — Conformist means "you have no negotiating power"
- External systems often force you into Conformist or ACL patterns
