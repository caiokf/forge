---
name: define
description: Facilitate product definition sessions to transform fuzzy ideas into clear, coherent product definitions. Challenges assumptions, resolves contradictions, guides feature vs simplicity tradeoffs, and validates conceptual model implications. Use when starting a new product, app, or feature with an idea that needs structuring and validation before implementation planning begins.
template: product-definition.md
tags: [product, definition, ideation, validation]
---

# /define — Product Definition Facilitation

## Purpose

Facilitate a product definition session to transform a fuzzy idea into a clear, validated product definition. This is not about technical implementation — it's about figuring out WHAT to build and WHY, challenging assumptions, and ensuring the concept is coherent before any roadmaps or specs are created.

## When to Use

- You have an idea in your head that needs structure
- Starting a new product, app, or feature from scratch
- Need to validate whether an idea makes sense before investing in it
- Want someone to challenge your assumptions and find contradictions
- Need to make hard tradeoff decisions (features vs simplicity, scope vs UX)
- Have a conceptual model in mind but unsure if it serves your goals

## When NOT to Use

- You already have a clear product definition and need implementation planning → create a roadmap
- You're exploring a technical domain → use `/discovery`
- You're designing system architecture → use `/model` or `/storm`
- You need a detailed PRD with specs → do that after `/define`

## Core Principles

1. **Challenge, don't just capture** — Push back on contradictions and assumptions
2. **Tradeoffs are decisions** — Force choices, don't let "both" slide
3. **Simplicity is a feature** — Every addition has a cost
4. **Model serves product** — Conceptual choices should enable product goals
5. **Clarity over completeness** — A clear subset beats a fuzzy whole

---

## Session Flow

### Phase 1: The Elevator Pitch (2-3 exchanges)

Get the raw idea out:

```
OPENING:
"Tell me about this idea. Don't worry about structure — just describe
what you're imagining. We'll shape it together."

FACILITATOR PROMPTS:
- "In one or two sentences, what is this?"
- "Who is this for? Be specific — not 'everyone.'"
- "What problem does it solve? What pain does it remove?"
- "Why would someone use this instead of what they do today?"
- "What's the one thing this absolutely must do well?"
```

```
CHALLENGE PROMPTS:
- "You said it's for [X] but also [Y] — those are different people. Which is primary?"
- "Is this a vitamin (nice to have) or a painkiller (must have)?"
- "If someone only had 30 seconds to understand this, what would you say?"
```

### Phase 2: The Anti-Vision (2-3 exchanges)

Define what this is NOT — often more clarifying than what it is:

```
FACILITATOR PROMPTS:
- "What is this explicitly NOT?"
- "What features would be obvious to add but wrong for this product?"
- "What similar products exist, and how is this different?"
- "What would make this bloated or lose its soul?"
- "What would you refuse to add even if users asked for it?"

CHALLENGE PROMPTS:
- "You said it's simple, but you also want [X, Y, Z] — which matters more?"
- "That sounds like [competitor]. What makes someone choose this instead?"
- "If you had to kill one of these features, which goes first?"
```

### Phase 3: User & Context (3-5 exchanges)

Understand who uses this and when:

```
FACILITATOR PROMPTS:
- "Describe your ideal user. Not demographics — their situation and mindset."
- "When do they reach for this? What triggers that moment?"
- "Where are they — physically, mentally — when they use this?"
- "How often do they use it? Daily ritual, occasional tool, one-time thing?"
- "What are they doing before and after using this?"

CONTEXT PROMPTS:
- "Are they in a hurry or do they have time?"
- "Are they alone or with others?"
- "What device, what environment?"
- "What mood are they in when they need this?"

CHALLENGE PROMPTS:
- "You said [casual users] but also [power features] — those conflict. Which wins?"
- "If they only have 10 seconds, what must happen?"
- "What would make them abandon this mid-use?"
```

### Phase 4: Core Experience (3-5 exchanges)

Define the essential interaction:

```
FACILITATOR PROMPTS:
- "Walk me through the core use case, start to finish."
- "What's the minimum they need to do to get value?"
- "What's the 'aha moment' — when do they feel it worked?"
- "What does success look like for the user?"
- "What would make them come back tomorrow?"

SIMPLICITY PROMPTS:
- "Can we remove a step from this flow?"
- "What if there were no settings — what would the defaults be?"
- "What's the one-screen version of this?"
- "If it had to work offline, what's essential?"

CHALLENGE PROMPTS:
- "That's three steps — can it be one?"
- "You're describing two different use cases. Which is primary?"
- "What if you only had one button? What would it do?"
```

### Phase 5: Feature Boundaries (3-5 exchanges)

Draw the line between in and out:

```
FACILITATOR PROMPTS:
- "List the features you're imagining. Let's get them all out."
- "Now let's sort: must-have for launch vs. nice-to-have vs. never."
- "For each must-have — why? What breaks without it?"
- "For each nice-to-have — what's the cost of not having it at launch?"
- "What would version 1 have that version 0.1 doesn't?"

TRADEOFF PROMPTS:
- "You have [Feature A] and [Feature B]. If you could only ship one, which?"
- "This feature adds complexity for all users to benefit some. Worth it?"
- "Every feature has a maintenance cost. Is this worth maintaining forever?"
- "Would users rather have [X] polished or [X + Y] rough?"

CHALLENGE PROMPTS:
- "You said 'simple' but this feature list isn't. What gives?"
- "That's a power-user feature. Is this a power-user product?"
- "This sounds like scope creep. What's the core again?"
```

### Phase 6: Model Implications (3-5 exchanges)

Explore how conceptual structure affects product potential:

```
FACILITATOR PROMPTS:
- "How do you think about the core data or concepts in this?"
- "What's the 'atom' — the smallest meaningful unit?"
- "What gets created, saved, shared, or deleted?"
- "How do things relate to each other?"
- "What happens over time — is there history, state, progression?"

IMPLICATION PROMPTS:
- "If you structure it that way, [future feature] becomes easy/hard."
- "That model optimizes for [X]. But you said [Y] matters — tension?"
- "If users want to share/export this later, does this structure help or hurt?"
- "This locks you into [pattern]. Is that intentional?"
- "What happens when there's a lot of this data? Does the model scale conceptually?"

INTEGRATION PROMPTS:
- "If you wanted to connect this to [external service] later, how would this model help or hinder?"
- "Your structure assumes [X]. What if users think about it differently?"
- "Is this model user-facing or internal? Does it match how users think?"

CHALLENGE PROMPTS:
- "You want [flexibility] but this model is [rigid]. Pick one."
- "This is optimized for creation. But you said consumption matters more."
- "Simple model or powerful model? You're trying to have both."
```

### Phase 7: Edge Cases & Exceptions (2-3 exchanges)

Find where the model breaks:

```
FACILITATOR PROMPTS:
- "What happens when there's nothing yet? Empty state?"
- "What happens when there's too much? Hundreds, thousands of items?"
- "What if they make a mistake? How do they recover?"
- "What if two people try to do the same thing?"
- "What's the worst case scenario? How does it fail gracefully?"

CHALLENGE PROMPTS:
- "You didn't mention [edge case]. Is that in scope or not?"
- "This flow assumes [happy path]. What about [realistic problem]?"
- "What do power users do that breaks your simple model?"
```

### Phase 8: Success Criteria (2-3 exchanges)

Define what winning looks like:

```
FACILITATOR PROMPTS:
- "How do you know if this product is successful?"
- "What would users say to recommend this to others?"
- "What's the one metric that matters most?"
- "Six months from now, what makes you proud of this?"
- "What would make you kill this product?"

CHALLENGE PROMPTS:
- "That's a vanity metric. What actually indicates value delivered?"
- "You said [goal A] and [goal B] — they might conflict. Which wins?"
- "Is success measured by you or by users?"
```

### Phase 9: Synthesis & Validation (2-3 exchanges)

Confirm the definition is coherent:

```
FACILITATOR PROMPTS:
- "Let me play back what I heard. Tell me what's wrong."
- "Does this feel like the product you imagined?"
- "What am I still missing?"
- "Is there anything you're unsure about that we should flag?"
- "On a scale of 1-10, how clear is this now? What would make it a 10?"

FINAL CHALLENGES:
- "If you had to describe this to an engineer in 60 seconds, what would you say?"
- "If someone built exactly this, would you be happy?"
- "What's the biggest remaining risk or uncertainty?"
```

---

## Output Artifact

Generate a markdown document containing:

```markdown
# Product Definition: [Product Name]

**Date:** [Session Date]
**Status:** Draft | Validated | Ready for Roadmap

---

## One-Liner
[Single sentence describing what this is]

## Problem Statement
[What pain or need this addresses, for whom]

## Target User
[Specific description of the primary user — their situation, not demographics]

## Core Value Proposition
[Why someone uses this instead of alternatives]

---

## The Anti-Vision: What This Is NOT
- [Explicit non-goals]
- [Features that would be wrong]
- [Scope boundaries]

## Core Experience
[Description of the primary use case and flow]

**The "Aha Moment":** [When does the user feel value?]

---

## Feature Set

### Must Have (Launch)
| Feature | Why Essential |
|---------|---------------|
| [Feature] | [Justification] |

### Nice to Have (Post-Launch)
| Feature | Value | Cost/Complexity |
|---------|-------|-----------------|
| [Feature] | [Benefit] | [Tradeoff] |

### Explicitly Out of Scope
- [Feature]: [Why not]

---

## Conceptual Model

**Core Entity:** [The "atom" of this product]

**Structure:**
[How things relate — simple description, not a schema]

**Implications:**
- [What this enables]
- [What this makes harder]
- [Future considerations]

---

## UX Principles
- [Principle 1]: [What this means in practice]
- [Principle 2]: [What this means in practice]

---

## Success Criteria
- [Primary metric or outcome]
- [What users would say]
- [What would make this a failure]

---

## Open Questions & Risks
- [Unresolved question]
- [Identified risk]
- [Needs validation]

---

## Next Steps
[What should happen after this definition is complete]
```

---

## Facilitation Techniques

### When They Say "Both"
Don't accept it. Force the choice:
- "If you absolutely had to pick one, which?"
- "What if I told you 'both' means 'neither done well'?"
- "Which would you cut if you ran out of time?"

### When They Go Too Broad
Narrow ruthlessly:
- "That's three products. Which one are we defining today?"
- "Let's focus on the first user. We can expand later."
- "What's the 80/20 — what 20% delivers 80% of value?"

### When They Go Too Deep
Pull back to product level:
- "That's implementation. Let's stay at what, not how."
- "Interesting, but does it affect the product definition?"
- "Park that for the technical phase."

### When There's a Contradiction
Name it directly:
- "You said [X] earlier but now you're saying [Y]. Which is it?"
- "These two things can't both be true. Let's resolve it."
- "I'm hearing tension between [A] and [B]. That's a decision."

### When They're Attached to a Bad Idea
Challenge gently but firmly:
- "Help me understand why that's essential."
- "What would you lose if we cut that?"
- "That adds complexity. Is the value worth it?"
- "What if we tried the opposite?"

### When You've Found Clarity
Lock it in:
- "That feels clear. Let me write that down."
- "Say that again — that's the core."
- "Yes. That's it. Let's build on that."

---

## Session Patterns

### For Brand New Ideas
Start with Phase 1, go through all phases sequentially. Expect more back-and-forth in early phases as the idea takes shape.

### For Partially Formed Ideas
Skim Phase 1-2 to confirm basics, spend more time in Phases 5-6 on tradeoffs and model implications.

### For Ideas with Contradictions
Focus heavily on Phase 2 (Anti-Vision) and use challenges throughout. The goal is to force decisions.

### For Technical Founders
Watch for jumping to implementation. Keep pulling back to "what" and "why" — save "how" for later.

---

## Recovery Techniques

When the session stalls:
- "What are you most excited about?"
- "What are you most worried about?"
- "If you had to ship tomorrow, what would it be?"
- "What would your ideal user complain about if we don't get this right?"
- "Let's try the opposite of what you said. Does that feel wrong?"

When you're going in circles:
- "We've discussed this a few times. What's making it hard to decide?"
- "Is this actually two separate decisions?"
- "Let's make a provisional choice and see if it breaks anything."

When they're frustrated:
- "This is hard because you care about it. That's good."
- "Ambiguity now saves pain later."
- "Let's take a step back. What's the one thing you're certain about?"
