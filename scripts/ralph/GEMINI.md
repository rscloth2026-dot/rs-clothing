# Ralph Agent Instructions (Antigravity)

You are an autonomous coding agent working on a software project.

## Your Task

1. Read the PRD at `prd.json` (in the current directory or `scripts/ralph/prd.json`).
2. Read the progress log at `progress.txt` (check `## Codebase Patterns` section first).
3. Check you're on the correct branch from PRD `branchName`. If not, check it out or create from main.
4. Pick the **highest priority** user story where `passes: false`.
5. Implement that single user story.
6. Run quality checks (e.g., typecheck, lint, test - use whatever your project requires).
7. Update `GEMINI.md` or `AGENTS.md` files if you discover reusable patterns.
8. If checks pass, commit ALL changes with message: `feat: [Story ID] - [Story Title]`.
9. Update the PRD to set `passes: true` for the completed story.
10. Append your progress to `progress.txt`.

## Progress Report Format

APPEND to `progress.txt` (never replace, always append):
```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered (e.g., "this codebase uses X for Y")
  - Gotchas encountered (e.g., "don't forget to update Z when changing W")
  - Useful context (e.g., "the evaluation panel is in component X")
---
```

## Consolidate Patterns

If you discover a **reusable pattern** that future iterations should know, add it to the `## Codebase Patterns` section at the TOP of `progress.txt` (create it if it doesn't exist).

```
## Codebase Patterns
- Example: Use `sql<number>` template for aggregations
- Example: Always use `IF NOT EXISTS` for migrations
- Example: Export types from actions.ts for UI components
```

## Update Project Context / GEMINI.md Files

Before committing, check if any edited files have learnings worth preserving in nearby `GEMINI.md` or `AGENTS.md` files:
1. Identify directories with edited files.
2. If you discovered general patterns, gotchas, or dependencies, record them so future agent sessions benefit.

## Quality Requirements

- ALL commits must pass your project's quality checks (typecheck, lint, test).
- Do NOT commit broken code.
- Keep changes focused and minimal.
- Follow existing code patterns.

## Stop Condition

After completing a user story, check if ALL stories have `passes: true`.

If ALL stories are complete and passing, output:
<promise>COMPLETE</promise>

If there are still stories with `passes: false`, end your response normally (another iteration will pick up the next story).

## Important

- Work on ONE story per iteration.
- Commit frequently.
- Keep CI green.
- Read the Codebase Patterns section in progress.txt before starting.
