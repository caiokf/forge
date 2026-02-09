---
name: model
description: Facilitates Event Modeling sessions to design complete system blueprints showing how information flows from UI through commands, events, and read models. Use when designing a new feature end-to-end, translating domain events from Event Storming into implementation specs, creating shared blueprints for frontend/backend teams, planning CQRS or event-sourced architectures, or documenting existing system flows with Given-When-Then specifications.
template: event-model-template.md
tags: [event-modeling, system-design, cqrs]
---

# /model — Event Modeling Facilitation

## Purpose

Facilitate an Event Modeling session to design the complete blueprint of a system — from user interface through commands, events, and read models. Event Modeling, created by Adam Dymitruk, provides a visual timeline that shows how information flows through a system.

## When to Use

- You have domain events from an Event Storming and need to design the system
- Designing a new feature or user journey end-to-end
- Creating a shared blueprint between frontend, backend, and infrastructure teams
- Planning implementation work with clear specifications
- Documenting an existing system's architecture

## Session Flow

### Phase 1: System Context (2-3 exchanges)

Establish what we're modeling and the constraints:

```
FACILITATOR PROMPTS:
- "What system or feature are we modeling today?"
- "Do you have events from a previous storming session, or are we starting fresh?"
- "What's the primary user journey we want to model?"
- "Who are the actors — users, admins, external systems?"
- "What are the key business rules that must never be violated?"
- "Are there existing systems this integrates with? What are their constraints?"
- "What compliance or regulatory requirements affect this domain?"
```

Before moving on: "Let me summarize the context. Does this capture the scope correctly?"

### Phase 2: UI Screens & Data Requirements (3-5 exchanges)

Start with the white boxes at the top — what does the user see?

```
FACILITATOR PROMPTS:
- "Let's start with the user interface. What's the first screen or interaction?"
- "What information does the user see on this screen?"
- "What actions can they take from here?"
- "What feedback does the user receive after taking action?"
- "Are there different views for different user roles?"
- "What validation rules apply to each field? What makes input invalid?"
- "What does the user see when there's no data yet? (empty states)"
- "What error messages appear when validation fails?"
```

Capture as: `[Screen Name]` — key fields (with type, required, validation), actions visible

Before moving on: "We've identified [N] screens. Let me list them — does this cover the user journey?"

### Phase 3: Commands — Blue Boxes (5-7 exchanges)

Add the commands that users trigger:

```
FACILITATOR PROMPTS:
- "What command does the user invoke from [Screen]?"
- "What data does this command carry? What's the payload?"
- "What preconditions must be true for this command to succeed?"
- "What happens when each precondition fails? What's the rejection event?"
- "Who is authorized to execute this command? Any ownership checks?"
- "What's the command's name in ubiquitous language?"
- "What happens if this command is sent twice accidentally? Is it idempotent?"
- "Can this command partially succeed? What happens to the successful parts?"
```

Format:

```
Command: [CommandName]
Payload: { field1, field2, ... }
Actor: [who triggers it]
Authorization: [role/permission required]
Idempotency: [strategy]
```

Before moving on: "We have [N] commands. Every command should produce at least one event — let's verify."

### Phase 4: Events — Orange Boxes (5-7 exchanges)

Add the events that result from commands:

```
FACILITATOR PROMPTS:
- "What event is recorded when [Command] succeeds?"
- "What data does this event capture? What's the minimum needed for audit/replay?"
- "Can this command result in different events based on conditions?"
- "What's the event's name — remember, past tense?"
- "What failure events need to be recorded for audit, analytics, or triggering compensating actions?"
- "How will this event evolve over time? What fields might be added?"
- "Does the order of these events matter? What happens if they arrive out of order?"
- "What metadata should every event carry? (correlationId, timestamp, actor)"
```

Format:

```
Event: [EventName]
Data: { field1, field2, timestamp, ... }
Triggered by: [Command]
Version: [current version, evolution notes]
```

Before moving on: "We have [N] events. Every event should feed a read model or trigger an automation — let's check."

### Phase 5: Read Models — Green Boxes (5-7 exchanges)

Define the read models that power the UI:

```
FACILITATOR PROMPTS:
- "What data does [Screen] need to display?"
- "Which events contribute to building this read model?"
- "Is this a list view, detail view, or aggregate/summary?"
- "How fresh does this data need to be?"
  - Real-time (< 2s) — for active workflows
  - Near real-time (< 30s) — for dashboards
  - Eventually consistent (< 5min) — for analytics
  - Cached with TTL — for catalogs/reference data
- "What queries will users perform against this data?"
- "Who can see this data? Any row-level or field-level security?"
- "How large could this dataset grow? Pagination or filtering needed?"
```

Format:

```
Read Model: [Name]
Fields: { field1, field2, ... }
Built from: [Event1, Event2, ...]
Used by: [Screen]
Freshness: [requirement]
Access: [who can query]
```

### Phase 6: Automation & Policies — Lilac Swimlane (3-5 exchanges)

Add automated processes that react to events:

```
FACILITATOR PROMPTS:
- "When [Event] happens, what must always happen? What should usually happen?"
- "Are there notifications, emails, or webhooks to send?"
- "Do any events trigger commands in other parts of the system?"
- "Are there scheduled jobs or time-based triggers?"
- "What external systems need to be notified?"
- "What happens if the automated action fails? Retry? Dead letter? Alert?"
- "Can multiple policies trigger from the same event? What's the priority?"
- "When should automation escalate to a human? What's the escalation path?"
```

Format:
```
When [Event] → [Processor] → [Command/Action]
On failure: [retry strategy or escalation]
```

### Phase 7: Timeline Organization (3-5 exchanges)

Arrange everything into a coherent left-to-right timeline:

```
FACILITATOR PROMPTS:
- "Let's walk through the timeline from start to finish."
- "What are the lifecycle phases? (e.g., acquisition, trial, active, churned)"
- "Is this the order things happen, or can some occur in parallel?"
- "Where are the aggregate boundaries? What events belong together?"
- "Which workflows span multiple aggregates and need saga coordination?"
- "What compensating actions are needed if a step in a multi-step process fails?"
- "Are there any gaps — commands without events, or events without readers?"
```

Validation check: "Every command produces event(s), every event feeds a read model or automation."

### Phase 8: Given-When-Then Specifications (3-5 exchanges)

Create executable specifications for key scenarios:

```
FACILITATOR PROMPTS:
- "Let's write a specification for the happy path."
- "Given the system is in [state], when [command] happens, then [events] are recorded."
- "What are the key alternative scenarios?"
- "What are the top 5 most likely ways this could fail in production?"
- "What happens at the boundaries? (exactly at quota limit, last day of trial, $0 invoice)"
- "What happens during partial system outage? (payment gateway down, DB read-only)"
- "What malicious inputs should we guard against?"
```

Format:

```gherkin
Given [preconditions/existing events]
When [command is executed]
Then [events are recorded]
And [read model reflects changes]
```

### Phase 9: Synthesis (2-3 exchanges)

Wrap up and produce the artifact:

```
FACILITATOR PROMPTS:
- "Let me compile the complete event model. Does this look right?"
- "Let's quantify: [N] screens, [N] commands, [N] events, [N] read models, [N] automations, [N] specifications."
- "Are there any gaps or areas we should revisit?"
- "What are the riskiest or most complex parts of this model?"
- "What implementation tasks fall out of this? What should be built first?"
```

## Output Artifact

Generate a markdown document using `templates/event-model-template.md` containing:

1. **System overview** — what we modeled and the scope
2. **UI/Wireframes** — screens and their purpose
3. **Commands** — full list with payloads
4. **Events** — full list with data schemas
5. **Read models** — projections and their sources
6. **Automations** — policies and processors
7. **Specifications** — Given-When-Then scenarios
8. **Implementation notes** — tasks and open questions

## Four Swimlanes

The model uses four horizontal swimlanes:

```
┌─────────────────────────────────────────────────────────────────┐
│  UI/UX        │ [Wireframes and screens - white]                │
├───────────────┼─────────────────────────────────────────────────┤
│  Commands     │ [User intentions - blue]                        │
├───────────────┼─────────────────────────────────────────────────┤
│  Events       │ [Facts that happened - orange]                  │
├───────────────┼─────────────────────────────────────────────────┤
│  Read Models  │ [Query-side projections - green]                │
├───────────────┼─────────────────────────────────────────────────┤
│  Automation   │ [Policies & processors - lilac]                 │
└───────────────┴─────────────────────────────────────────────────┘
                 ─────────────────────────────────────────────────→
                              TIME (left to right)
```

## Facilitation Tips

- Start with what the user sees — UI first grounds the conversation
- Every command should produce at least one event
- Every event should be consumed by at least one read model or automation
- Read models answer specific questions — name them by their purpose
- The timeline is the spec — it shows what to build and in what order
- Blue commands are synchronous intent, orange events are asynchronous facts

## Unsticking Techniques

When participants get blocked, try these approaches:

- **"Pretend It's Broken"** — "Imagine this has been live 6 months and customers are complaining. What are they complaining about?"
- **"New Employee"** — "If a new team member asked 'why does this event exist?', what would you tell them?"
- **"Customer Support"** — "A customer calls support about this feature. What questions might they ask?"
- **"Rollback"** — "If we had to undo this action, what information would we need?"
- **"Audit Log"** — "In 2 years, legal asks for a complete history. What do we need recorded?"
- **"Concrete Example"** — "Let's pick a specific user: Jane from Acme Corp, on Pro plan, 10 days into trial. What exactly happens when she...?"
- **"Skip and Return"** — "Let's mark this 'TBD' and move on. We'll revisit after modeling more."

## Common Pitfalls

Watch for these issues during the session:

- Commands without failure events — what happens when preconditions aren't met?
- Events not consumed by any read model or automation — orphan events indicate gaps
- Read models with unclear freshness — "fast" is not a requirement
- Automation without failure handling — what if the email service is down?
- Missing idempotency strategy — distributed systems have at-least-once delivery
- Authorization assumed but not documented — who can actually do this?
