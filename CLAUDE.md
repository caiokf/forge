# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

```
.claude-plugin/marketplace.json       # Marketplace index (source of truth for versions)
plugins/
  {plugin}/
    .claude-plugin/plugin.json        # Plugin manifest (version here takes priority)
    commands/*.md                     # Command definitions (lean triggers referencing skills)
    skills/{skill}/SKILL.md           # Skill definitions (~1500 words, progressive disclosure)
    skills/{skill}/references/        # Detailed docs loaded on demand
    skills/{skill}/templates/         # Output templates for session artifacts
    hooks/hooks.json                  # Hook configuration
    hooks/*.sh                        # Hook scripts
    agents/*.md                       # Agent definitions
```

### Commands vs Skills

- **Commands** are user-invoked slash commands (e.g., `/storm`). They are lean triggers (~20-40 lines) that describe how to orchestrate a session and reference the corresponding skill.
- **Skills** hold domain knowledge, facilitation guidance, and reference material. SKILL.md provides the overview; `references/` holds detailed prompts loaded progressively; `templates/` holds output scaffolding.
- Commands reference their skill by instructing the agent to read the skill's `SKILL.md` file.

## Plugin Development

### Creating a Plugin

1. Create directory structure: `plugins/{name}/.claude-plugin/plugin.json`
2. Add skills in `plugins/{name}/skills/{skill}/SKILL.md`
3. Add commands in `plugins/{name}/commands/{command}.md`
4. Register in `.claude-plugin/marketplace.json`

### Skill Frontmatter (YAML between `---` markers)

Per the [official spec](https://code.claude.com/docs/en/skills), valid frontmatter fields are:

| Field                      | Required    | Description                                                                  |
| -------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `name`                     | No          | Defaults to directory name. Lowercase, numbers, hyphens only (max 64 chars)  |
| `description`              | Recommended | What the skill does and when to use it. Include trigger phrases and keywords |
| `argument-hint`            | No          | Hint shown during autocomplete (e.g., `[issue-number]`)                      |
| `disable-model-invocation` | No          | `true` to prevent Claude auto-loading. Default: `false`                      |
| `user-invocable`           | No          | `false` to hide from `/` menu. Default: `true`                               |
| `allowed-tools`            | No          | Tools Claude can use without permission when skill is active                 |
| `model`                    | No          | Model to use when skill is active                                            |
| `context`                  | No          | `fork` to run in a subagent                                                  |
| `agent`                    | No          | Subagent type when `context: fork`                                           |
| `hooks`                    | No          | Hooks scoped to this skill's lifecycle                                       |

**Do not use non-standard fields** like `tags:`, `template:`, or `skill:`.

### Skill Best Practices

- **Keep SKILL.md under 500 lines**, detailed content in `references/`
- **Third-person descriptions**: "This skill should be used when..." not "Use this skill when..."
- **Imperative form**: "Query before starting work" not "You should query..."
- **Tables over prose**: More scannable, lower token count
- **Colocate templates**: Output templates live in `skills/{skill}/templates/`, not a shared directory
- **Reference files**: Separate by purpose — `facilitator-prompts.md`, `recovery-techniques.md`, etc.

### Command Best Practices

- Keep commands lean — purpose, instructions, related commands
- Instructions should tell the agent which files to read and in what order
- Include a "Related Commands" table for discoverability

### Hook Scripts

SessionStart hooks should output JSON with `suppressOutput: true`:

```bash
jq -n '{
  "suppressOutput": true,
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Brief context here"
  }
}'
```

## Version Management

Version can be set in either file; `plugin.json` takes priority if both are set:

- `.claude-plugin/marketplace.json` - marketplace-level plugin versions
- `plugins/{name}/.claude-plugin/plugin.json` - individual plugin version (takes priority)

Use `/release` skill to manage versions and changelog.

### Semantic Versioning

| Change                  | Bump  |
| ----------------------- | ----- |
| Breaking change         | Major |
| New skill/command/agent | Minor |
| Bug fix, doc update     | Patch |

## Local Development

Test plugins locally:

```bash
claude --plugin-dir /path/to/forge/plugins/{plugin}
```
