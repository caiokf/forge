# Stressor Map: [System Name]

**Date:** [Session Date]
**Participants:** [Names/Roles]
**System Criticality:** [Critical / High / Medium / Low]

---

## System Context

**System Description:** [What this system does]

**Business Criticality:** [Why this system matters]

**SLA Requirements:**
- Availability: [e.g., 99.9%]
- Latency: [e.g., p99 < 200ms]
- Data Durability: [e.g., no data loss]

---

## Essential Residue

> What MUST survive when everything goes wrong? The core capabilities that cannot be compromised.

| Priority | Capability | Minimum Viable Behavior | Max Acceptable Downtime |
|----------|------------|-------------------------|-------------------------|
| P0 | [Critical capability] | [Degraded but functional] | [Time] |
| P1 | [Important capability] | [Degraded behavior] | [Time] |
| P2 | [Nice to have] | [Can be offline] | [Time] |

---

## Stressor Inventory

### Infrastructure Stressors

| ID | Stressor | Likelihood | Impact | Detection | Recovery |
|----|----------|------------|--------|-----------|----------|
| I1 | Server/instance failure | Medium | Medium | [How detected] | [RTO] |
| I2 | Availability zone outage | Low | High | | |
| I3 | Database unavailable | Low | Critical | | |
| I4 | Network partition | Low | High | | |
| I5 | Disk full | Medium | Medium | | |
| I6 | Memory exhaustion | Medium | Medium | | |
| I7 | CPU saturation | Medium | Low | | |
| I8 | 10x traffic spike | Medium | Medium | | |
| I9 | 100x traffic spike | Low | Critical | | |

### Dependency Stressors

| ID | Stressor | Likelihood | Impact | Detection | Recovery |
|----|----------|------------|--------|-----------|----------|
| D1 | [Dependency] slow (>2s) | High | Medium | | |
| D2 | [Dependency] errors (5xx) | Medium | Medium | | |
| D3 | [Dependency] unavailable | Low | High | | |
| D4 | [Dependency] rate limited | Medium | Medium | | |
| D5 | [Dependency] contract change | Low | High | | |

### Data Stressors

| ID | Stressor | Likelihood | Impact | Detection | Recovery |
|----|----------|------------|--------|-----------|----------|
| DA1 | Data corruption | Low | Critical | | |
| DA2 | Inconsistent state | Medium | High | | |
| DA3 | Duplicate messages | High | Medium | | |
| DA4 | Out-of-order events | Medium | Medium | | |
| DA5 | Schema mismatch | Low | High | | |
| DA6 | Bad deployment writes bad data | Low | Critical | | |

### Human Stressors

| ID | Stressor | Likelihood | Impact | Detection | Recovery |
|----|----------|------------|--------|-----------|----------|
| H1 | Configuration mistake | High | Varies | | |
| H2 | Wrong version deployed | Medium | High | | |
| H3 | Accidental data deletion | Low | Critical | | |
| H4 | Key person unavailable | Medium | Medium | | |
| H5 | Insufficient on-call coverage | Medium | High | | |

### Business Stressors

| ID | Stressor | Likelihood | Impact | Detection | Recovery |
|----|----------|------------|--------|-----------|----------|
| B1 | Viral growth / sudden success | Low | High | | |
| B2 | Seasonal peak | High | Medium | | |
| B3 | Large customer onboard | Medium | Medium | | |
| B4 | Large customer churn | Low | Medium | | |
| B5 | Acquisition / migration | Low | High | | |

### Security Stressors

| ID | Stressor | Likelihood | Impact | Detection | Recovery |
|----|----------|------------|--------|-----------|----------|
| S1 | Credential leak | Low | Critical | | |
| S2 | DDoS attack | Medium | High | | |
| S3 | Admin access compromise | Low | Critical | | |
| S4 | Supply chain attack | Low | Critical | | |
| S5 | Data breach | Low | Critical | | |

---

## Impact Matrix

```
                    IMPACT
                    Low      Medium    High      Critical
            ┌────────────────────────────────────────────┐
   Frequent │        │  I7     │         │              │
            ├────────────────────────────────────────────┤
LIKELIHOOD  │        │ D1,DA3  │  H1     │              │
   Medium   │        │ I5,I6   │  I8     │              │
            ├────────────────────────────────────────────┤
            │        │         │  D3,I2  │  I3,DA1      │
   Rare     │        │         │  I4     │  H3,S1       │
            └────────────────────────────────────────────┘
```

**Priority Focus:** High-right quadrant (High/Critical impact, any likelihood)

---

## Current Mitigations

| Stressor ID | Current Mitigation | Effectiveness | Gaps |
|-------------|-------------------|---------------|------|
| I1 | Auto-scaling group | Good | Single AZ |
| I3 | Read replicas | Partial | No auto-failover |
| | | | |

---

## Mitigation Recommendations

### Critical Priority (Address before production)

| Stressor | Recommended Mitigation | Pattern | Effort |
|----------|----------------------|---------|--------|
| [ID] | [What to implement] | [Circuit breaker/Bulkhead/etc] | S/M/L |
| | | | |

### High Priority (Address within [timeframe])

| Stressor | Recommended Mitigation | Pattern | Effort |
|----------|----------------------|---------|--------|
| | | | |

### Medium Priority (Backlog)

| Stressor | Recommended Mitigation | Pattern | Effort |
|----------|----------------------|---------|--------|
| | | | |

---

## Resilience Patterns to Apply

### Circuit Breakers

| Dependency | Threshold | Timeout | Fallback |
|------------|-----------|---------|----------|
| [Service] | [n failures] | [duration] | [What to do instead] |
| | | | |

### Bulkheads

| Resource | Isolation Strategy | Limit |
|----------|-------------------|-------|
| [Thread pool/Connection pool] | [How isolated] | [Max] |
| | | |

### Retries

| Operation | Strategy | Max Attempts | Backoff |
|-----------|----------|--------------|---------|
| [Operation] | [Exponential/Linear] | [n] | [base, max] |
| | | | |

### Fallbacks

| Scenario | Primary Behavior | Fallback Behavior |
|----------|-----------------|-------------------|
| [When X fails] | [Normal path] | [Degraded path] |
| | | |

### Caching

| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| [What] | [Write-through/Aside] | [Duration] | [How] |
| | | | |

---

## Observability Requirements

### Metrics Needed

| Metric | Purpose | Alert Threshold |
|--------|---------|-----------------|
| [metric.name] | [What it tells us] | [When to alert] |
| | | |

### Alerts to Configure

| Alert | Condition | Severity | Runbook |
|-------|-----------|----------|---------|
| [Alert name] | [When to fire] | Critical/Warning | [Link] |
| | | | |

### Dashboards Needed

| Dashboard | Key Visualizations |
|-----------|-------------------|
| [Name] | [What to show] |
| | |

---

## Runbooks Required

| Scenario | Runbook Content Needed |
|----------|----------------------|
| [Stressor scenario] | [Steps to diagnose and recover] |
| | |

---

## Chaos Testing Plan

| Test | Target Stressor | Method | Success Criteria |
|------|-----------------|--------|------------------|
| [Test name] | [What we're testing] | [How to inject] | [Expected behavior] |
| | | | |

---

## Action Items

| Priority | Action | Owner | Status |
|----------|--------|-------|--------|
| P0 | | | |
| P1 | | | |
| P2 | | | |

---

## Session Notes

### Key Insights
-

### Surprises
-

### Open Questions
-

### Follow-up Sessions Needed
- [ ] Deep dive on [area]
- [ ] Review with [team/stakeholder]
