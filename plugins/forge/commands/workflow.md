---
name: workflow
description: Facilitates interactive BPMN workflow discovery sessions to model business processes through guided conversation and iterative refinement. Use when exploring a process idea that needs fleshing out, determining appropriate diagram granularity, discovering edge cases and decision points, validating process understanding with stakeholders, or modeling cross-team workflows. Supports both new process discovery and refinement of existing .bpmn files.
tags: [bpmn, workflow, process, modeling, discovery]
skill: bpmn
---

# /workflow — BPMN Workflow Discovery

## Purpose

Facilitate an interactive session to discover, model, and refine business processes as BPMN diagrams. Unlike direct diagram generation (`/bpmn`), this command guides you through iterative exploration to find the right level of granularity for your workflows.

## When to Use

- You have a high-level idea of a process but need to flesh it out
- You're unsure how detailed your diagrams should be
- You want to discover edge cases, exceptions, and decision points
- You need to validate process understanding with stakeholders
- You're modeling a process that spans multiple teams or systems

## When NOT to Use

- You already know exactly what you want → use `/bpmn` directly
- You're exploring a domain without a specific process in mind → use `/discovery`
- You want to focus on events and eventual consistency → use `/storm`

## Invocation Modes

### New Process
```
/workflow
```
Starts fresh — discovers process from scratch, creates new .bpmn file.

### Refine Existing Process
```
/workflow order-fulfillment.bpmn
```
Loads existing file, summarizes current state, then continues refinement:
- Drill into a subprocess
- Add missing exception paths
- Expand a collapsed task
- Add participants/lanes

When refining, skip completed phases and jump to the relevant work.

## Session Flow

### Phase 1: Process Overview (2-3 exchanges)

**If starting fresh:** Establish the process context and boundaries.

**If refining existing file:** Read the .bpmn file, summarize what exists, and ask what to work on.

```
OPENING (New Process):
"Let's map out your workflow step by step. We'll start high-level and
drill into details where it matters. Think of this as sketching on a
whiteboard — we can always refine as we go."

FACILITATOR PROMPTS (New):
- "In one or two sentences, what does this process accomplish?"
- "What triggers this process to start? What signals that it's complete?"
- "Who are the main participants — people, teams, or systems involved?"
- "What's the scope? Where does this process end and another begin?"
```

```
OPENING (Existing File):
"I've loaded [filename].bpmn. Here's what I see: [summary of process,
tasks, gateways, current state]. What would you like to work on?"

FACILITATOR PROMPTS (Refine):
- "Which part of this process should we drill into?"
- "Are there tasks here that are actually multiple steps?"
- "What's missing — exception paths, participants, integrations?"
- "Should we expand [Task X] into a subprocess?"
```

Capture:
- Process name and purpose
- Trigger (start event)
- Outcome (end event)
- Key participants (swimlanes)

### Phase 2: Happy Path Discovery (3-5 exchanges)

Map the main flow without exceptions:

```
FACILITATOR PROMPTS:
- "Walk me through the ideal scenario. What's the first thing that happens after the trigger?"
- "And then what happens? Keep going until we reach the end."
- "Who performs each of these steps?"
- "Are any of these steps happening at the same time (in parallel)?"

PROBING PROMPTS:
- "Between [Step A] and [Step B], is there anything else that happens?"
- "You mentioned [X] — is that one action or actually multiple steps?"
- "How long does [Step] typically take? Does timing matter?"
```

```
IF STUCK:
- "Let's work backwards. What's the last thing that happens before completion?"
- "Think of a specific recent instance of this process. Walk me through what happened."
```

**OUTPUT:** Generate initial Level 0 diagram showing the happy path.

---

**TRANSITION:** "Great — we have the happy path mapped. Now let's find where things get interesting: decisions, branches, and what happens when things don't go as planned."

---

### Phase 3: Decision Points & Branches (3-5 exchanges)

Discover gateways and alternative paths:

```
FACILITATOR PROMPTS:
- "At any point, are there decisions that change the flow?"
- "What questions get asked at [Step]? What are the possible answers?"
- "Are there situations where you'd skip [Step] entirely?"
- "When do different participants get involved based on conditions?"

GATEWAY IDENTIFICATION:
- "Is this an either/or decision (exclusive) or could multiple paths be taken (parallel/inclusive)?"
- "What information is needed to make this decision?"
- "Who or what makes this decision — a person, a rule, or a system?"
```

```
BRANCH EXPLORATION:
For each gateway identified:
- "If [Condition A], what happens next?"
- "If [Condition B], what's the alternative path?"
- "Do these paths eventually merge back together, or do they lead to different outcomes?"
```

**OUTPUT:** Update diagram with decision gateways and branches.

### Phase 4: Exception Paths & Error Handling (3-5 exchanges)

Discover what happens when things go wrong:

```
FACILITATOR PROMPTS:
- "What can go wrong at [Step]? How is it handled?"
- "Are there timeouts or deadlines? What happens if they're missed?"
- "If [Step] fails, can you retry? Roll back? Escalate?"
- "Are there any steps that can be cancelled or reversed mid-process?"

COMPENSATION PROMPTS:
- "If the process needs to be undone after [Step], what gets reversed?"
- "Are there any cleanup actions needed when the process fails?"

ESCALATION PROMPTS:
- "When does a human need to intervene?"
- "What triggers an escalation? Who gets notified?"
```

**OUTPUT:** Add error events, compensation flows, and escalation paths.

### Phase 5: Granularity Negotiation (3-5 exchanges)

Find the right level of detail:

```
FACILITATOR PROMPTS:
- "Looking at [Step], is this one atomic action or actually several steps?"
- "For your purposes, do we need to see inside [Step] or can it stay as a black box?"
- "Who is the audience for this diagram? What decisions will they make based on it?"

DRILL-DOWN TRIGGERS:
- Step takes more than a few minutes
- Multiple people are involved in one "step"
- There are decisions hidden inside the step
- Errors need specific handling within the step

ROLL-UP TRIGGERS:
- Details are implementation-specific, not process-relevant
- Audience doesn't need to see internal mechanics
- Steps are always performed together by same person/system
```

For each step that needs expansion:

```
SUBPROCESS EXPLORATION:
- "Let's zoom into [Step]. What's the first thing that happens inside it?"
- "Are there decision points within [Step]?"
- "What would cause [Step] to fail, and how is it handled internally?"
```

**OUTPUT:** Create subprocess diagrams for expanded steps.

### Phase 6: Participants & Handoffs (2-3 exchanges)

Clarify roles and transitions:

```
FACILITATOR PROMPTS:
- "Let's confirm who does what. For each step, who's responsible?"
- "Where do handoffs occur between people or teams?"
- "Are there steps that require coordination between participants?"
- "Who's waiting on whom at any point?"

HANDOFF PROMPTS:
- "When [Actor A] finishes [Step], how does [Actor B] know to start?"
- "Is there a formal handoff, or does the next person just pick it up?"
- "What information passes between [Actor A] and [Actor B]?"
```

**OUTPUT:** Update diagrams with swimlanes and handoff points.

### Phase 7: External Systems & Integrations (2-3 exchanges)

Identify system touchpoints:

```
FACILITATOR PROMPTS:
- "What external systems does this process interact with?"
- "Are there any automated steps that a system performs?"
- "Where does data come from? Where does it go?"
- "Are there any waiting points where you're expecting a response from outside?"

INTEGRATION PROMPTS:
- "Is [System] synchronous (wait for response) or asynchronous (fire and forget)?"
- "What happens if [System] is unavailable?"
- "Are there any third-party services involved — payments, notifications, shipping?"
```

**OUTPUT:** Add system tasks and message events.

### Phase 8: Validation & Completeness (2-3 exchanges)

Review and fill gaps:

```
FACILITATOR PROMPTS:
- "Let's walk through the diagram from start to finish. Does anything feel missing?"
- "Are there any paths that don't have a clear ending?"
- "For each decision, have we covered all the possible outcomes?"
- "Is there any scenario this diagram doesn't handle?"

COMPLETENESS CHECKS:
- Every gateway has at least two outgoing paths
- All paths eventually reach an end event
- No orphaned steps (everything is connected)
- Swimlanes are consistent (steps assigned to participants)
```

### Phase 9: Documentation & Artifacts (2-3 exchanges)

Capture process knowledge:

```
FACILITATOR PROMPTS:
- "Are there any business rules we should document alongside the diagram?"
- "What terms should go in the glossary for someone new to this process?"
- "Are there metrics or SLAs associated with this process?"
- "What should happen next — who needs to review this? What follow-up sessions?"
```

## Output Artifacts

Generate BPMN 2.0 XML files (.bpmn) using the `/bpmn` skill:

### File Structure

```
[process-name]/
├── [process-name].bpmn              # Main process (Level 0)
├── [subprocess-a].bpmn              # Expanded subprocess
├── [subprocess-b].bpmn              # Expanded subprocess
└── ...
```

### Progressive Output

| Phase | Output |
|-------|--------|
| After Phase 2 | Initial `[process-name].bpmn` with happy path |
| After Phase 3 | Updated with gateways and branches |
| After Phase 4 | Updated with error events and compensation |
| After Phase 5 | Subprocess `.bpmn` files for expanded steps |
| After Phase 6 | Updated with lanes and participants |
| After Phase 7 | Updated with service tasks and message events |
| Final | Complete, validated .bpmn files |

### Reading Back

At any point, read the current `.bpmn` file to review progress:
- Use `/bpmn Read [filename].bpmn` to see current state
- Diagrams can be opened in Camunda Modeler, Bizagi, or any BPMN 2.0 tool

## Granularity Guidance

| Signal | Action |
|--------|--------|
| "It depends..." | Add a gateway |
| "Well, first we... then..." | Consider subprocess |
| "Someone has to approve..." | Add decision gateway with actor |
| "Unless it fails..." | Add error path |
| "At the same time..." | Add parallel gateway |
| "We wait for..." | Add intermediate event |
| "The system does..." | Add service task |

## Facilitation Tips

- Start broad, narrow down — it's easier to add detail than remove it
- Use the participant's language — match their terminology
- Sketch before perfecting — rough diagrams spark better discussions
- Time-box deep dives — don't get lost in one subprocess
- Mark uncertainties as hotspots — capture what you don't know
- Diagrams are communication tools — optimize for the audience

## Iteration Pattern

This command supports iterative refinement across multiple sessions:

```
Session 1: /workflow
    └─► Discover Level 0 (happy path + major decisions)
    └─► Output: order-fulfillment.bpmn
    ↓
Review with stakeholders
    ↓
Session 2: /workflow order-fulfillment.bpmn
    └─► "Let's expand the Fulfillment task"
    └─► Output: order-fulfillment.bpmn (updated with subprocess)
    ↓
Session 3: /workflow order-fulfillment.bpmn
    └─► "Add error handling to Payment"
    └─► Output: order-fulfillment.bpmn (updated with error paths)
    ↓
...continue until sufficient detail
```

## Related Commands

| Command | When to Use |
|---------|-------------|
| `/bpmn` | Direct diagram generation when you know what you want |
| `/storm` | Event-first discovery, then convert to BPMN |
| `/model` | System design with event sourcing focus |
| `/context` | Identify service boundaries before process modeling |
