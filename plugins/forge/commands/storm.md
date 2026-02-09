---
name: storm
description: Facilitates an Event Storming workshop to discover domain events, commands, aggregates, policies, and bounded contexts through guided collaborative exploration. Use when starting a new project and needing to understand the domain, exploring complex business processes end-to-end, identifying aggregate boundaries and transactional consistency requirements, building shared understanding between developers and domain experts, or discovering pain points in existing workflows. Triggers include requests to map a business process, understand domain complexity, find aggregate boundaries, run an event storming session, or explore how a system works from a DDD perspective.
template: event-storming-board.md
tags: [event-storming, domain-discovery, ddd]
---

# /storm — Event Storming Facilitation

## Purpose

Facilitate an Event Storming session to discover domain events, commands, aggregates, policies, and bounded contexts in a system. Event Storming is a collaborative workshop format invented by Alberto Brandolini that uses "sticky notes" to explore complex business domains.

## When to Use

- Starting a new project and need to understand the domain
- Exploring a complex business process end-to-end
- Identifying aggregates and transactional boundaries
- Building shared understanding between developers and domain experts
- Discovering pain points and opportunities in existing processes

## Session Flow

### Phase 1: Set the Stage (2-3 exchanges)

Start with psychological safety and context:

```
OPENING:
"In Event Storming, we value quantity over quality in the early phases.
There are no wrong events — if you think something might be relevant,
throw it on the board. We'll organize later."

FACILITATOR PROMPTS:
- "What system or business process are we going to storm today?"
- "Can you give me a 2-3 sentence description of what this system does?"
- "Who are the main actors or users involved in this process?"
- "What level of depth do we need?"
  - Big Picture: Exploring an entire value stream end-to-end
  - Process Level: Deep dive into one bounded context or process
  - Design Level: Detailed enough to start implementation (invariants, state machines)
```

### Phase 2: Chaotic Exploration — Domain Events (5-10 exchanges)

Discover domain events using the orange sticky note format. Events are past-tense facts that happened in the domain.

```
FACILITATOR PROMPTS:
- "Let's start throwing events on the board. What's the first thing that happens?"
- "What happens after [previous event]? What's the next significant thing?"
- "What's the happy path? And what can go wrong?"
- "What events would a domain expert care about? What would they want to be notified of?"
- "Is there anything that happens periodically, on a schedule, or with a deadline?"
- "Are there any time limits or SLAs that trigger events if exceeded?"

EXCEPTION & COMPENSATION PROMPTS:
- "For each happy path event — what's the 'undo' or failure event?"
- "What happens when [Event] fails partially or times out?"
- "How do you recover from a failure at this step?"
- "When something goes wrong, who gets notified?"
```

Format events as: `[Event Name]` — past tense, business language
Examples: `Order Placed`, `Payment Received`, `Shipment Dispatched`, `Refund Issued`

```
IF STUCK:
- "What happens at the very end of this process? Let's work backwards."
- "What's the one event that absolutely must happen for success?"
- "What would make a stakeholder call you at 2am about this system?"
```

---

**TRANSITION:** "Great — we've got a lot on the board! Now let's shift from brainstorming to organizing. This might feel slower, but it helps us see the full picture."

---

### Phase 3: Enforce Timeline (3-5 exchanges)

Organize events into a coherent timeline from left to right:

```
FACILITATOR PROMPTS:
- "Let's arrange these events in order. What happens first?"
- "I see we have [Event A] and [Event B] — which comes first?"
- "Are there events that can happen in any order, or is there a strict sequence?"
- "Where are the swimlanes? Are there parallel processes happening?"
- "Which events MUST complete before the next can start?"
```

### Phase 4: Commands, Actors & External Systems (5-7 exchanges)

Add blue sticky notes for commands, yellow for actors, and green for external systems:

```
FACILITATOR PROMPTS:
- "What command or action causes [Event] to happen?"
- "Who or what triggers this command? Is it a user, system, or external service?"
- "What information does the actor need to provide to execute this command?"
- "Are there any automated triggers — time-based, event-based, or external webhooks?"

EXTERNAL SYSTEMS PROMPTS:
- "Which events come FROM systems outside our domain?"
- "Which events do we need to SEND to external systems?"
- "What third-party services are involved — payments, notifications, shipping?"
- "What happens if an external system is unavailable?"
```

Format: `Actor` performs `Command` → results in `Event`

```
IF STUCK:
- "Let's pick a specific event. If you were a user, what button would you click?"
- "Is this triggered by a human decision or automatically by the system?"
```

### Phase 5: Read Models & Views (3-5 exchanges)

Add green sticky notes for read models — the information actors need to see:

```
FACILITATOR PROMPTS:
- "Before performing [Command], what information does the actor need to see?"
- "What would be displayed on the screen for this step?"
- "Are there dashboards, lists, or reports that users check regularly?"
- "What search or filter capabilities do users need?"
- "Is this view built from events in one aggregate or multiple?"
```

Format: `[View Name]` shows `[Data Elements]` to help `[Actor]` decide `[Command]`

### Phase 6: Aggregates & Boundaries (3-5 exchanges)

Identify aggregates (yellow rectangles) that handle commands and emit events:

```
FACILITATOR PROMPTS:
- "What entity is responsible for handling [Command] and ensuring [Event] happens correctly?"
- "What data does this aggregate need to make its decision?"
- "What invariants or business rules must this aggregate enforce?"
- "Do these events belong to the same aggregate, or are they separate concerns?"
- "What MUST be true before [Command] can be accepted?"
```

```
IF STUCK:
- "If you had to give this cluster of events a name, what would you call the 'thing' that manages them?"
- "What noun would a domain expert use to describe this?"
```

### Phase 7: Bounded Contexts (3-5 exchanges)

Identify natural boundaries where language or ownership changes:

```
FACILITATOR PROMPTS:
- "Where do you see language changing? Same concept, different words?"
- "Which aggregates always change together vs independently?"
- "Where would you draw a line to split teams or services?"
- "What data crosses from one area to another — and who owns the truth?"
- "Are there places where one area waits for or depends on another?"
```

Context relationship patterns to identify:
- **Upstream/Downstream**: Who publishes events the other consumes?
- **Shared Kernel**: What's genuinely shared between contexts?
- **Anti-Corruption Layer**: Where do we translate between languages?

### Phase 8: Policies & Reactions (3-5 exchanges)

Add lilac sticky notes for policies — automated reactions to events:

```
FACILITATOR PROMPTS:
- "When [Event] happens, does anything else need to happen automatically?"
- "Are there any business rules like 'whenever X, then Y'?"
- "What notifications or side effects are triggered by this event?"
- "Are there any compliance or regulatory actions that must follow?"
- "If this event happened at 3am with no humans watching, what needs to happen automatically?"
```

Format: `When [Event] then [Action]`

### Phase 9: Hotspots & Questions (2-3 exchanges)

Mark areas of confusion, conflict, or opportunity with pink/red stickies:

```
FACILITATOR PROMPTS:
- "What parts of this flow are unclear or contentious?"
- "Where do you see potential problems or bottlenecks?"
- "What questions came up that we couldn't answer?"
- "What would you want to dig deeper into?"
```

### Phase 10: Synthesis (2-3 exchanges)

Wrap up and produce the artifact:

```
FACILITATOR PROMPTS:
- "Let me summarize what we discovered. As you review it, tell me what's wrong or missing."
- "On a scale of 1-10, how well does this capture your mental model? What would make it a 10?"
- "What are the top 3 insights or surprises from this session?"
- "What should we explore in a follow-up session?"
```

## Output Artifact

Generate a markdown document using the `templates/event-storming-board.md` template containing:

1. **Session context** — what we explored, depth level, and scope
2. **Event timeline** — happy path and exception events
3. **Commands & actors** — who triggers what
4. **Read models** — information needed for decisions
5. **Aggregates** — key entities, their responsibilities, and invariants
6. **Bounded contexts** — natural boundaries and relationships
7. **Policies** — automated reactions and business rules
8. **External systems** — integrations and dependencies
9. **Hotspots** — questions and areas for further exploration
10. **Ubiquitous language** — glossary of terms discovered

## Facilitation Tips

- Keep energy high — this is exploration, not documentation
- Embrace chaos early, organize later
- Domain language matters — use the words experts use
- Events are facts, not actions — past tense is crucial
- When stuck, ask "and then what happens?" or work backwards from the end
- Conflicts reveal complexity — when participants disagree, capture BOTH views as separate events and mark it as a hotspot: "Interesting — we have two views here. Let's capture both for now."
- For Big Picture sessions, stay on events and hotspots, skip aggregate details
- For Design Level sessions, dig into invariants, state transitions, and preconditions
