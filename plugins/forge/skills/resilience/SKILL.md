---
description: Provides Residuality Theory facilitation guidance — systematically identifying stressors, failure modes, and resilience patterns for systems. Use when preparing for production, designing for high availability, conducting post-incident reviews, stress-testing architecture, assessing fault tolerance, or discussing graceful degradation, blast radius, circuit breakers, and bulkheads.
user-invocable: false
---

# Resilience & Residuality

This skill provides knowledge and facilitation guidance for Residuality Theory sessions — a systematic approach developed by Barry O'Reilly to identify stressors, failure modes, and design for resilience by understanding what remains (the "residue") when systems are stressed.

## When to Use

This skill should be used when:

- Preparing a system for production deployment
- Designing for high availability and fault tolerance
- Conducting post-incident reviews to prevent recurrence
- Stress-testing an architecture before implementation
- Building systems that degrade gracefully under load
- Compliance and risk assessment exercises

## Core Concepts

### Stressor Categories

| Category       | Examples                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| Infrastructure | Server failure, AZ outage, DB unavailable, network partition, resource exhaustion, traffic spikes          |
| Dependency     | External service slow/down/errors, rate limiting, contract changes, single points of failure               |
| Data           | Corruption, inconsistency, duplicate messages, out-of-order events, schema mismatch, bad deployment writes |
| Human          | Configuration mistakes, wrong deployment, accidental deletion, key person unavailable                      |
| Business       | Viral growth, seasonal peaks, large customer onboard/churn, acquisition                                    |
| Security       | Credential leaks, DDoS, admin compromise, supply chain attacks                                             |

### Resilience Patterns

| Pattern            | Purpose                       |
| ------------------ | ----------------------------- |
| Circuit Breakers   | Prevent cascade failures      |
| Bulkheads          | Isolate failure domains       |
| Retry with backoff | Handle transient failures     |
| Fallbacks          | Provide degraded alternatives |
| Health checks      | Detect problems early         |
| Chaos testing      | Verify resilience works       |

### Essential Residue

The core question: "If everything goes wrong, what MUST keep working?" Define the minimum viable service, data that cannot be lost, capabilities that can be temporarily sacrificed, and the system's "lifeboat mode."

## Session Flow

### Phase 1: Set the Stage (2-3 exchanges)

Establish the system, its current state (greenfield/production/post-incident), business-critical capabilities, and risk appetite.

### Phase 2: Identify Stressors (7-10 exchanges)

Systematically explore what can go wrong across all six stressor categories: infrastructure, dependency, data, human, business, and security.

### Phase 3: Impact Assessment (5-7 exchanges)

For each stressor, assess blast radius, user experience impact, business impact, time tolerance, and likelihood. Build an impact matrix.

### Phase 4: Current Mitigations (3-5 exchanges)

Understand existing defenses — circuit breakers, retries, fallbacks, monitoring, backup strategies. Assess effectiveness and gaps.

### Phase 5: Residue Identification (5-7 exchanges)

Determine the essential residue — what must survive at all costs. Define minimum viable service, critical data, sacrificeable capabilities.

### Phase 6: Mitigation Design (5-7 exchanges)

Design resilience patterns for critical stressors. Match patterns to stressors, design redundancy, caching, and feature flags for graceful degradation.

### Phase 7: Observability & Detection (3-5 exchanges)

Ensure stressors can be detected and responded to. Define metrics, alerts, runbooks, and escalation paths.

### Phase 8: Synthesis (2-3 exchanges)

Compile stressor map, prioritize top risks, determine resilience work priorities.

## Output Artifact

Generate a markdown document using `templates/stressor-map.md` containing:

1. System context and criticality
2. Stressor inventory across all categories
3. Impact matrix (likelihood vs. impact)
4. Essential residue — what must survive
5. Mitigation patterns for each critical stressor
6. Observability requirements (metrics, alerts, runbooks)
7. Action items — prioritized resilience improvements

## Facilitation Principles

- Make it safe to discuss failure — this is engineering, not blame
- "What if?" is the most powerful question
- Distinguish between "unlikely" and "won't happen to us"
- Every system has a failure mode — the question is whether it's been designed for
- Think in blast radius — how far does the damage spread?
- Good systems degrade gracefully; great systems degrade usefully
- The goal isn't to prevent all failure — it's to survive and recover quickly

## References

| File                                | Content                                             |
| ----------------------------------- | --------------------------------------------------- |
| `references/facilitator-prompts.md` | Detailed facilitator prompts for each session phase |
| `templates/stressor-map.md`         | Output template for the stressor map artifact       |
