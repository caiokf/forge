---
name: c4-architecture
description: Generate comprehensive C4 architecture documentation for a codebase using bottom-up analysis
skill: c4
tags: [c4, architecture, documentation, codebase-analysis]
---

# /c4-architecture - Automated C4 Documentation Generation

## Purpose

Generate comprehensive C4 architecture documentation for an existing codebase using bottom-up analysis. This workflow analyzes code directories, synthesizes components, maps containers, and creates system context documentation.

## When to Use

- Documenting an existing codebase for new team members
- Creating architecture overview for stakeholders
- Generating API documentation from code analysis
- Building a complete architecture documentation set

## Prerequisites

- Access to the codebase root directory
- Understanding of deployment structure (Docker, K8s, cloud services)
- Knowledge of external system integrations

## Workflow Overview

```
Phase 1: Code Level      →  Analyze directories bottom-up
Phase 2: Component Level →  Synthesize into logical components
Phase 3: Container Level →  Map to deployment units + APIs
Phase 4: Context Level   →  Create stakeholder-friendly overview
```

**Note**: Per the [C4 model](https://c4model.com/diagrams), most teams only need Context and Container diagrams. This workflow generates all levels for completeness, but you can stop at any phase.

---

## Phase 1: Code-Level Documentation

**Goal**: Document every code directory from deepest to shallowest.

### 1.1 Discover Directories

```
ACTIONS:
1. List all subdirectories in the codebase
2. Sort by depth (deepest first for bottom-up processing)
3. Filter out: node_modules, .git, build, dist, __pycache__, vendor, etc.
4. Create processing queue
```

### 1.2 Document Each Directory

For each directory, create a `c4-code-[directory-name].md` file:

```
ANALYSIS TASKS:
- Identify all functions/methods with complete signatures
- Document classes, modules, and their relationships
- Map internal dependencies (imports from this codebase)
- Map external dependencies (libraries, frameworks)
- Note design patterns in use
- Create Mermaid diagram if relationships are complex

OUTPUT: C4-Documentation/c4-code-[sanitized-directory-name].md
```

Use the `/c4` skill reference for the documentation template.

**Repeat for every directory** until all have corresponding documentation.

---

## Phase 2: Component-Level Synthesis

**Goal**: Group code documentation into logical components.

### 2.1 Analyze Code Documentation

```
ANALYSIS TASKS:
- Review all c4-code-*.md files from Phase 1
- Identify logical boundaries:
  - Domain boundaries (related business functionality)
  - Technical boundaries (shared frameworks, patterns)
  - Organizational boundaries (team ownership if evident)
- Group related code files into components
```

### 2.2 Create Component Documentation

For each identified component:

```
DOCUMENTATION TASKS:
- Name the component descriptively
- Define its responsibilities and purpose
- List software features it provides
- Document interfaces (APIs, methods, contracts)
- Link to contained c4-code-*.md files
- Map dependencies on other components
- Create Mermaid component diagram

OUTPUT: C4-Documentation/c4-component-[component-name].md
```

### 2.3 Create Component Index

```
CREATE: C4-Documentation/c4-component.md

CONTENTS:
- List of all components with descriptions
- Links to individual component docs
- Master Mermaid diagram showing all component relationships
```

---

## Phase 3: Container-Level Synthesis

**Goal**: Map components to deployment units and document APIs.

### 3.1 Analyze Deployment Definitions

```
SEARCH FOR:
- Dockerfiles
- docker-compose.yml
- Kubernetes manifests (deployment, service, ingress)
- Terraform / CloudFormation configs
- Cloud function definitions (AWS Lambda, Azure Functions)
- CI/CD pipeline definitions
- Package.json scripts, Procfiles, etc.
```

### 3.2 Map Components to Containers

```
ANALYSIS TASKS:
- Determine which components deploy together
- Identify container boundaries from deployment configs
- Map technology stacks per container
- Identify inter-container communication patterns
```

### 3.3 Create Container Documentation

```
DOCUMENTATION TASKS:
- Document each container (type, technology, deployment)
- List components deployed in each container
- Document all container APIs/interfaces
- Create OpenAPI specs for REST APIs
- Map container dependencies and protocols
- Link to deployment configurations
- Create Mermaid container diagram

OUTPUT:
- C4-Documentation/c4-container.md
- C4-Documentation/apis/[container]-api.yaml (per container with APIs)
```

---

## Phase 4: Context-Level Documentation

**Goal**: Create stakeholder-friendly system overview.

### 4.1 Analyze System Documentation

```
GATHER:
- README files
- Architecture documentation
- Requirements documents
- Test files (to understand behavior)
- API documentation
- User documentation
```

### 4.2 Create Context Documentation

```
DOCUMENTATION TASKS:
- Write system overview (short + long descriptions)
- Identify all personas:
  - Human users (roles, goals, features used)
  - Programmatic users (external systems, API consumers)
- Document system features with user mappings
- Create user journey maps for key features
- Document all external dependencies
- Create Mermaid context diagram

OUTPUT: C4-Documentation/c4-context.md
```

---

## Output Structure

```
C4-Documentation/
├── c4-context.md              # Level 1: System context (start here)
├── c4-container.md            # Level 2: Deployment architecture
├── c4-component.md            # Level 3: Component index
├── c4-component-[name].md     # Level 3: Individual components
├── c4-code-[name].md          # Level 4: Code-level docs
└── apis/
    └── [container]-api.yaml   # OpenAPI specs
```

---

## Success Criteria

- [ ] Every code directory has a c4-code-*.md file
- [ ] Code docs include complete function signatures and dependencies
- [ ] Components have clear boundaries and responsibilities
- [ ] Component index includes relationship diagram
- [ ] Containers map to actual deployment units
- [ ] Container APIs have OpenAPI specifications
- [ ] Context includes all personas (human + programmatic)
- [ ] User journeys documented for key features
- [ ] All external dependencies identified
- [ ] Mermaid diagrams render correctly at each level
- [ ] Documentation links work between levels

---

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `target_directory` | repo root | Root directory to analyze |
| `output_directory` | C4-Documentation/ | Where to write docs |
| `exclude_patterns` | node_modules, .git, build, dist | Directories to skip |
| `include_tests` | true | Analyze test files for context |
| `api_format` | openapi | Format for API specs |
| `levels` | all | Which C4 levels to generate (context, container, component, code) |

---

## Example Usage

```bash
# Full documentation generation
/c4-architecture

# Only context and container levels
/c4-architecture --levels context,container

# Specific directory
/c4-architecture --target ./src/api
```

---

## Tips

- **Start with Context**: Even if generating bottom-up, review c4-context.md first for the big picture
- **Skip Code level for simple areas**: Only generate c4-code-*.md for complex modules
- **Update incrementally**: Re-run on changed directories rather than full regeneration
- **Review with stakeholders**: Context diagram should make sense to non-technical people
- **Validate APIs**: Test generated OpenAPI specs with Swagger UI or similar tools
