# Forge

A collection of [Claude Code](https://claude.ai/code) plugins for software architecture discovery and modeling.

## Forge Plugin

The main plugin is a toolkit of interactive facilitation skills that guide you through architecture and domain modeling techniques — from early discovery through to detailed system design.

### Commands

| Command | Description |
|---------|-------------|
| `/discovery` | Explore a problem space through open-ended domain discovery |
| `/define` | Transform a fuzzy product idea into a clear, validated definition |
| `/brainstorm` | Run a multi-agent ideation session with three AI thinking styles |
| `/storm` | Discover domain events, commands, and aggregates via Event Storming |
| `/model` | Design system blueprints with Event Modeling (commands, events, read models) |
| `/context` | Map DDD bounded contexts and their relationships |
| `/workflow` | Discover and model business processes as BPMN diagrams |
| `/c4-architecture` | Generate C4 architecture documentation from an existing codebase |
| `/residuality` | Stress-test architectures using Residuality Theory |

### Typical Flow

```
/discovery  -->  /define  -->  /storm  -->  /model
                                  |
                                  v
                              /context  -->  /workflow
```

Start with `/discovery` to explore the problem space, `/define` to sharpen the product definition, then move into modeling with `/storm` or `/model`. Use `/context` to map bounded contexts and `/workflow` for process-level detail. `/c4-architecture` works against existing codebases. `/residuality` can be applied at any stage to stress-test decisions.

## Installation

```
/plugin marketplace add caiokf/forge
/plugin install forge
```

## Project Structure

```
.claude-plugin/
  marketplace.json                       # Marketplace index
  plugin.json                            # Plugin manifest (v1.0.0)
commands/*.md                            # Slash command definitions
skills/
  brainstorming/                         # Multi-agent ideation
  domain-discovery/                      # Open-ended domain exploration
  product-definition/                    # Product definition facilitation
  event-storming/                        # Event Storming facilitation
  event-modeling/                        # Event Modeling facilitation
  bounded-contexts/                      # DDD context mapping
  bpmn-workflow/                         # BPMN process discovery
  bpmn/                                  # BPMN 2.0 file operations
  c4/                                    # C4 architecture documentation
  residuality/                           # Residuality Theory sessions
```

Each skill contains a `SKILL.md` with domain knowledge, `references/` for detailed prompts, and `templates/` for session output scaffolding.
