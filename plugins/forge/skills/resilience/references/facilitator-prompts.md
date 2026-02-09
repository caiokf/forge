# Resilience & Residuality — Facilitator Prompts

Detailed prompts organized by session phase. Use these during facilitation to guide the conversation through each phase.

---

## Phase 1: Set the Stage

```
FACILITATOR PROMPTS:
- "What system or component are we analyzing for resilience today?"
- "What's the current state — greenfield design, existing production, or post-incident?"
- "What are the business-critical capabilities this system must protect?"
- "What's your risk appetite — startup speed vs. enterprise reliability?"
```

---

## Phase 2: Identify Stressors

### Infrastructure Stressors

```
FACILITATOR PROMPTS:
- "What happens when a server dies? A whole availability zone?"
- "What if the database becomes unavailable or corrupted?"
- "What happens under 10x normal load? 100x?"
- "What if the network partitions — can your services still function?"
- "What if disk fills up, memory exhausts, or CPU spikes to 100%?"
```

### Dependency Stressors

```
FACILITATOR PROMPTS:
- "What external services do you depend on? APIs, payment providers, auth?"
- "What happens when [dependency] is slow? Returns errors? Is completely down?"
- "What if a dependency changes its contract or rate limits you?"
- "Are there any single points of failure in your dependency chain?"
```

### Data Stressors

```
FACILITATOR PROMPTS:
- "What happens if data is corrupted or inconsistent?"
- "What if you need to replay or recover historical data?"
- "What happens with duplicate messages or out-of-order events?"
- "What if a bad deployment writes incorrect data for an hour?"
```

### Human Stressors

```
FACILITATOR PROMPTS:
- "What happens when someone makes a configuration mistake?"
- "What if the wrong version gets deployed to production?"
- "What if a developer accidentally deletes production data?"
- "What if a key team member is unavailable during an incident?"
```

### Business Stressors

```
FACILITATOR PROMPTS:
- "What if you go viral — can you handle sudden success?"
- "What happens during seasonal peaks — Black Friday, end of quarter?"
- "What if a large customer leaves or joins suddenly?"
- "What happens if you're acquired or need to migrate quickly?"
```

### Security Stressors

```
FACILITATOR PROMPTS:
- "What if credentials are leaked or compromised?"
- "What happens during a DDoS attack?"
- "What if a malicious actor gains access to your admin tools?"
- "What if a dependency is compromised (supply chain attack)?"
```

---

## Phase 3: Impact Assessment

```
FACILITATOR PROMPTS:
- "If [stressor] occurs, what's the blast radius? What's affected?"
- "How would users experience this failure?"
- "What's the business impact — revenue loss, reputation, compliance?"
- "How long can you tolerate this failure state?"
- "What's the likelihood of this occurring? Rare, occasional, frequent?"
```

Create an impact matrix:

| Stressor | Likelihood | Impact   | Detection Time | Recovery Time |
| -------- | ---------- | -------- | -------------- | ------------- |
| DB fails | Low        | Critical | Minutes        | Hours         |
| API slow | High       | Moderate | Seconds        | Minutes       |

---

## Phase 4: Current Mitigations

```
FACILITATOR PROMPTS:
- "What mitigations do you already have in place?"
- "Where are there circuit breakers, retries, or fallbacks?"
- "What monitoring and alerting exists?"
- "What's your current backup and recovery strategy?"
- "Have these mitigations been tested recently?"
```

---

## Phase 5: Residue Identification

```
FACILITATOR PROMPTS:
- "If everything goes wrong, what MUST keep working?"
- "What's the minimum viable service during degradation?"
- "What data absolutely cannot be lost?"
- "What capabilities can be temporarily sacrificed?"
- "What's the 'lifeboat mode' for this system?"
```

---

## Phase 6: Mitigation Design

```
FACILITATOR PROMPTS:
- "For [critical stressor], what mitigation patterns apply?"
- "Should this be circuit breaker, bulkhead, retry, or fallback?"
- "Where do we need redundancy — active-active, active-passive?"
- "What can we cache or precompute to survive dependency failures?"
- "What feature flags would help us degrade gracefully?"
```

---

## Phase 7: Observability & Detection

```
FACILITATOR PROMPTS:
- "How will you know when [stressor] is occurring?"
- "What metrics and alerts should exist?"
- "What's in your incident runbook for this scenario?"
- "How do you distinguish between 'bad' and 'catastrophic'?"
- "Who gets paged and what actions can they take?"
```

---

## Phase 8: Synthesis

```
FACILITATOR PROMPTS:
- "Let me compile the stressor map. Does this capture our analysis?"
- "What are the top 3 risks we must address before production?"
- "What resilience work should be prioritized?"
```
