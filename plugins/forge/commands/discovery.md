---
name: discovery
description: Facilitates open-ended domain discovery sessions to explore and understand a problem space, identify core concepts, workflows, business rules, and pain points before committing to specific modeling techniques. Use when starting a new project with an unfamiliar domain, onboarding to an existing system, conducting stakeholder interviews, building shared vocabulary, or unsure whether to use Event Storming, Event Modeling, or Context Mapping. Generates a comprehensive domain summary artifact with concepts, workflows, events, boundaries, and recommended next steps.
tags: [domain-discovery, exploration, requirements]
---

# /discovery — Domain Discovery Facilitation

## Purpose

Facilitate an open-ended Domain Discovery session to explore and understand a problem space before committing to specific modeling techniques. This is the most flexible session type — ideal for early exploration when you're not sure which structured technique to apply.

## When to Use

- Starting a brand new project with unfamiliar domain
- Exploring a problem space before deciding on solution approach
- Onboarding to an existing system you need to understand
- Initial stakeholder interviews and knowledge capture
- When you're not sure if you need Event Storming, Event Modeling, or something else
- Building shared vocabulary before diving into details

## Session Flow

> **Note on Structure**: These phases are areas to explore, not a strict sequence. When a participant mentions something from a later area (e.g., a pain point while discussing workflows), follow that thread while it's fresh. You can always return to earlier areas. The goal is coverage, not sequence.

### Phase 1: Set the Stage (2-3 exchanges)

Establish the exploration scope:

```
FACILITATOR PROMPTS:
- "What domain, system, or problem are we exploring today?"
- "What's your current understanding — blank slate, some knowledge, or deep expertise?"
- "What's the goal of this exploration — understanding, design, documentation?"
- "Are there specific questions you're trying to answer?"
```

### Phase 2: The 30,000-Foot View (3-5 exchanges)

Get the big picture first:

```
FACILITATOR PROMPTS:
- "In one paragraph, what does this system/domain do?"
- "Who are the main users or actors? What do they care about?"
- "What's the core value this system provides?"
- "What would break if this system didn't exist?"
- "What adjacent systems or domains does this interact with?"
```

### Phase 3: Business Drivers & Strategy (3-5 exchanges)

Understand WHY this domain matters:

```
FACILITATOR PROMPTS:
- "What business problem does this domain solve? What's the value?"
- "How does this domain contribute to revenue, cost savings, or competitive advantage?"
- "What would happen to the business if this domain performed poorly?"
- "What are the strategic priorities driving investment here?"
- "How is success measured? What KPIs or metrics matter?"
- "What SLAs or performance expectations exist?"
```

### Phase 4: Core Concepts (5-7 exchanges)

Identify the essential entities and concepts:

```
FACILITATOR PROMPTS:
- "What are the key 'things' in this domain? The main nouns?"
- "Tell me about [Concept] — what is it, what does it do?"
- "How is [Concept A] related to [Concept B]?"
- "What's the lifecycle of a [Concept]? How does it change over time?"
- "Are there different types or variations of [Concept]?"

STORY PROMPTS (use to get concrete details):
- "Tell me about a [Concept] that was particularly tricky to handle."
- "Can you walk me through a specific example of [Concept]?"
```

Build a concept inventory:
- Name
- Definition
- Relationships
- Lifecycle states

### Phase 5: Key Workflows (5-7 exchanges)

Understand what people actually do:

```
FACILITATOR PROMPTS:
- "What are the main workflows or processes in this domain?"
- "Walk me through [Workflow] step by step."
- "What triggers this workflow to start?"
- "What's the happy path? What's the outcome when it works?"
- "What decisions are made along the way? By whom?"
- "How does [Actor] know what to do next?"

DATA FLOW PROMPTS:
- "What information is needed to start this workflow? Where does it come from?"
- "What data is created or modified during this process?"
- "Which other systems or domains need this data?"
- "What's the source of truth for [Concept]? Who owns it?"
```

### Phase 6: Domain Events (3-5 exchanges)

Discover what significant things happen:

```
FACILITATOR PROMPTS:
- "What significant events happen to [Concept]?"
- "What causes [Concept] to change state? What triggers that?"
- "What happens in the domain that stakeholders care about or would want to be notified of?"
- "What events must be recorded or audited?"
- "When [Event] happens, what else needs to happen as a consequence?"
- "Are there events from outside the domain that affect it?"
```

### Phase 7: Pain Points & Complexity (3-5 exchanges)

Find where the dragons live:

```
FACILITATOR PROMPTS:
- "What's hard about this domain? Where's the complexity?"
- "What do people complain about or struggle with?"
- "Where do things go wrong most often?"
- "What edge cases cause the most trouble?"
- "What would domain experts argue about?"

STORY PROMPTS:
- "Tell me about the last time something went wrong."
- "What's an example of something that took way longer than expected?"

HIDDEN KNOWLEDGE PROMPTS:
- "What do you assume everyone already knows about this domain?"
- "What unwritten rules exist that newcomers learn the hard way?"
- "What knowledge lives only in people's heads?"
```

### Phase 8: Business Rules & Constraints (3-5 exchanges)

Uncover the rules of the game:

```
FACILITATOR PROMPTS:
- "What rules govern this domain? What must always be true?"
- "What are you not allowed to do? What constraints exist?"
- "Are there regulatory or compliance requirements?"
- "What calculations or formulas are important?"
- "What business logic gets complicated?"

TEMPORAL PROMPTS:
- "What time-sensitive rules exist? Deadlines? Windows of opportunity?"
- "What happens on a schedule? What triggers time-based events?"
- "Are there SLAs or response time requirements?"

STORY PROMPTS:
- "Tell me about a time when someone broke an important rule — what happened?"
```

### Phase 9: Language & Vocabulary (3-5 exchanges)

Establish ubiquitous language:

```
FACILITATOR PROMPTS:
- "What jargon or specialized terms do people use?"
- "Are there any words that mean different things to different people?"
- "What terms confuse newcomers to this domain?"
- "What's the difference between [Similar Term A] and [Similar Term B]?"
- "What would a domain expert correct me on?"
```

### Phase 10: Boundaries & Scope (3-5 exchanges)

Define what's in and what's out:

```
FACILITATOR PROMPTS:
- "What's clearly inside this domain? What's clearly outside?"
- "Where does this domain's responsibility end?"
- "What gets handed off to other systems or teams?"
- "Are there natural subdomains or clusters within this?"
- "What would you consider 'core' vs 'supporting' functionality?"

ORGANIZATIONAL PROMPTS:
- "Which teams own which parts of this domain?"
- "Where do teams disagree about responsibilities?"
- "Who has authority to make decisions about [Concept/Process]?"
```

### Phase 11: Historical Context (2-3 exchanges)

Understand how we got here:

```
FACILITATOR PROMPTS:
- "How has this domain evolved over time?"
- "What's legacy that you're stuck with?"
- "What decisions were made that you'd do differently now?"
- "What's changed in the business that the system hasn't caught up with?"

PROBLEM VS SOLUTION PROMPTS:
- "Which constraints come from the business vs. the current technology?"
- "What workarounds exist because of how it was built, not because of the domain?"
- "If there were no existing system, what would the business still need?"
```

### Phase 12: Future Direction (2-3 exchanges)

Understand where things are headed:

```
FACILITATOR PROMPTS:
- "What's on the roadmap for this domain?"
- "What new capabilities are needed?"
- "What would you change if you could start over?"
- "What's the vision for this domain in 2 years?"
```

### Phase 13: Synthesis & Next Steps (2-3 exchanges)

Wrap up and recommend next steps:

```
FACILITATOR PROMPTS:
- "Let me summarize what we've discovered. What did I miss or get wrong?"
- "What are the key insights from this exploration?"
- "What questions are still open that we should investigate?"
- "Based on this discovery, what technique should we use next?"
```

Recommendations based on findings:

- **Complex workflows with many events** → Suggest `/storm`
- **Need to design a system end-to-end** → Suggest `/model`
- **Multiple teams or systems interacting** → Suggest `/context`
- **Production readiness concerns** → Suggest `/residuality`

## Output Artifact

Generate a markdown document containing:

1. **Session Metadata** — date, participants, scope, goal
2. **Domain Summary** — one-paragraph overview
3. **Actors & Stakeholders** — who's involved and what they care about
4. **Business Drivers** — why this domain matters, key metrics
5. **Core Concepts** — glossary of key domain entities with relationships and lifecycles
6. **Key Workflows** — the main processes and their steps
7. **Domain Events** — significant things that happen
8. **Business Rules** — constraints and invariants
9. **Pain Points** — complexity and problem areas
10. **Boundaries** — what's in scope and what's adjacent
11. **Ubiquitous Language** — vocabulary, definitions, and confusion points
12. **Historical Context** — how we got here, legacy constraints, tech debt
13. **Future Direction** — roadmap, vision, upcoming requirements
14. **Open Questions & Hotspots** — unresolved questions needing follow-up
15. **Recommended Next Steps** — what session to run next

## Facilitation Tips

- This is exploration, not interrogation — be curious and follow threads
- There are no wrong answers — capture everything, filter later
- Ask "why?" and "tell me more" liberally
- **Use stories**: "Can you give me an example?" or "Tell me about a time when..." gets better answers than abstract questions
- Draw connections between concepts as they emerge
- It's okay to not know what technique you'll need — that's what discovery is for
- Contradictions and confusion are valuable signals — don't resolve them too quickly
- Domain experts often know more than they think — help them articulate it
- When you're confused, the domain is probably complicated — that's useful information
- End with concrete next steps — discovery should lead somewhere
- **Adaptive depth**: Spend more time where you encounter complexity or disagreement. Move on when answers are straightforward.

## Recovery Techniques

When conversation stalls:
- "What else should I know about this domain?"
- "What question should I have asked but didn't?"
- "What would surprise me about how this actually works?"
- "What do newcomers always get wrong?"
- "What's the most interesting problem in this domain?"
- "If you could wave a magic wand, what would you change?"

When you've gone down a wrong path:
- "Let me pause — I think I may have been asking about the wrong thing. Can you help me understand [X] better?"
- "Let me check my understanding so far — [summary]. How far off am I?"
- "This is interesting, but I'm wondering if we should park it and come back later. What do you think?"

When participant says "I don't know":
- "That's useful — what would you need to find out?"
- "Who would know?"
- "What happens in practice when no one knows?"
- "If you had to guess, what's your intuition?"

When participant is too verbose:
- "I'm hearing several threads — [X], [Y], and [Z]. Can we focus on [X] first?"

When participant is too terse:
- "Can you give me a specific example?"
- "Tell me about the last time this happened."
