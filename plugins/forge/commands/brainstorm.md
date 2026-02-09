---
name: brainstorm
description: Facilitates multi-perspective brainstorming using three AI agents (Opus, Sonnet, Haiku) to explore ideas from different angles. Use when you need creative ideation, want diverse perspectives on a problem, or need to flesh out an early concept. Triggers include requests to brainstorm, explore ideas, think through a problem, or get different perspectives on a concept.
tags: [ideation, creativity, multi-agent, brainstorming]
---

# /brainstorm — Multi-Agent Ideation Session

## Purpose

Facilitate a structured brainstorming session using three AI agents with different thinking styles to explore ideas from multiple perspectives. The session iteratively refines concepts through questioning and synthesis until actionable ideas emerge.

## When to Use

- Starting with a vague idea that needs shape
- Exploring possibilities for a new feature or project
- Getting unstuck on a problem with no clear solution
- Wanting diverse perspectives on an approach
- Fleshing out a concept before implementation

## Agent Roles

### Opus (Strategic Thinker)
- Focuses on big-picture implications and long-term value
- Asks probing "why" questions to uncover deeper motivations
- Challenges assumptions and identifies blind spots
- Connects ideas to broader patterns and principles

### Sonnet (Pragmatic Builder)
- Focuses on practical implementation and feasibility
- Asks "how" questions about execution and constraints
- Identifies concrete next steps and potential blockers
- Balances ambition with realistic scope

### Haiku (Creative Catalyst)
- Focuses on novel angles and unexpected connections
- Asks "what if" questions to expand possibilities
- Offers quick lateral thinking and fresh perspectives
- Keeps energy high with rapid-fire alternatives

## Session Flow

### Phase 1: Framing (1-2 exchanges)

Establish the brainstorm focus:

```
OPENING:
"Let's brainstorm together. I'll be gathering perspectives from three different
thinking styles to help explore this idea from multiple angles."

FACILITATOR PROMPTS:
- "What would you like to brainstorm about today?"
- "Is this related to the current project, or should I look at a specific document?"
- "What's the seed of the idea — even if it's rough or incomplete?"
- "What outcome would make this session successful for you?"
```

If the user points to a document or the current project, read the relevant context before proceeding.

### Phase 2: Initial Perspectives (1 exchange)

Launch all three agents in parallel to gather initial reactions:

```
AGENT PROMPTS (run in parallel):

OPUS (model: opus):
"You are the Strategic Thinker in a brainstorming session.
Context: [user's idea/document summary]
Your role: Analyze the big-picture implications. What's the deeper 'why' here?
What assumptions might need challenging? What broader patterns does this connect to?
Provide 2-3 strategic observations or questions."

SONNET (model: sonnet):
"You are the Pragmatic Builder in a brainstorming session.
Context: [user's idea/document summary]
Your role: Assess practical feasibility. How might this actually get built?
What constraints or blockers exist? What's a realistic first step?
Provide 2-3 practical observations or questions."

HAIKU (model: haiku):
"You are the Creative Catalyst in a brainstorming session.
Context: [user's idea/document summary]
Your role: Offer unexpected angles. What's a wild 'what if' here?
What adjacent ideas might combine interestingly? What's everyone missing?
Provide 2-3 creative observations or alternative angles."
```

### Phase 3: Synthesis & Question (1 exchange)

Present the agent perspectives to the user and ask ONE focused question:

```
FACILITATOR APPROACH:
1. Summarize the three perspectives concisely
2. Identify the most interesting tension or opportunity across them
3. Ask ONE question that moves the conversation forward

SYNTHESIS TEMPLATE:
"Here's what emerged from different angles:

**Strategic lens:** [Opus insight summary]
**Practical lens:** [Sonnet insight summary]
**Creative lens:** [Haiku insight summary]

The interesting tension here is [observation about contrast/alignment].

[Single focused question for the user]"
```

### Phase 4: Iterative Refinement (3-7 exchanges)

Based on user response, continue the cycle:

```
FOR EACH ITERATION:
1. Take user's response and any new direction
2. Run agents again with updated context (in parallel)
3. Synthesize and ask one focused question

AGENT UPDATE PROMPTS:
"Building on the previous discussion, the user has clarified: [user input]
Given this new direction, what's your updated perspective?
What question would help refine this further?"

FACILITATOR QUESTIONS TO DRIVE PROGRESS:
- "Which of these directions resonates most?"
- "What's the core constraint we should design around?"
- "If you had to pick one angle to pursue, which would it be?"
- "What would need to be true for [option] to work?"
- "What's the smallest version of this idea that would still be valuable?"
```

### Phase 5: Convergence (1-2 exchanges)

When ideas start to take shape, drive toward synthesis:

```
CONVERGENCE SIGNALS:
- User expresses preference for one direction
- Multiple agents align on a similar recommendation
- User asks "so what should I do?" or "what's next?"
- 5+ iterations have occurred

FACILITATOR PROMPTS:
- "It sounds like we're converging on [summary]. Is that right?"
- "The core idea seems to be [distilled concept]. What's missing?"
- "Ready to capture this as a concrete next step?"
```

### Phase 6: Output (1 exchange)

Produce a concise summary of what emerged:

```
OUTPUT TEMPLATE:
## Brainstorm Summary: [Topic]

### The Idea
[2-3 sentence distillation of the refined concept]

### Key Insights
- [Strategic insight that shaped the direction]
- [Practical constraint or opportunity identified]
- [Creative angle that added value]

### Open Questions
- [Unresolved question worth exploring]
- [Risk or assumption to validate]

### Suggested Next Steps
1. [Concrete first action]
2. [Follow-up exploration if relevant]
```

## Execution Instructions

When running this command:

1. **Start by framing** — Ask what to brainstorm and gather context
2. **Read context if needed** — If user points to a file or project, read relevant files first
3. **Run agents in parallel** — Use the Task tool with different models:
   - `subagent_type: "general-purpose"` with `model: "opus"` for strategic
   - `subagent_type: "general-purpose"` with `model: "sonnet"` for pragmatic
   - `subagent_type: "general-purpose"` with `model: "haiku"` for creative
4. **Synthesize and ask ONE question** — Don't overwhelm with multiple questions
5. **Iterate until convergence** — Usually 3-7 rounds of agent consultation
6. **Produce summary** — Capture what emerged when ideas take shape

## Facilitation Tips

- Keep agent consultations brief — we want quick perspectives, not essays
- ONE question at a time to the user — don't overwhelm
- Let interesting tensions drive the conversation forward
- It's okay if agents disagree — that's valuable signal
- Watch for convergence signals and help close the loop
- If stuck, ask "what would make this clearer?"
