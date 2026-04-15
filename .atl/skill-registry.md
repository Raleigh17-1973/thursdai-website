# Skill Registry — thursdai-website

## Compact Rules

### branch-pr
- Always create feature branches; never commit directly to main for SDD changes
- PR title: `fix(audit): ...` or `feat(audit): ...`

### sdd-apply
- Inject openspec task list before implementing
- Check off each task in state.yaml after completion
- Run tsc --noEmit after each file touched

## User Skills

| Trigger | Skill |
|---------|-------|
| creating/editing .docx | docx |
| sdd init/explore/propose/spec/design/tasks/apply/verify/archive | sdd-* |

## Project Conventions (from CLAUDE.md)
- npm only, never pnpm
- Dark mode: data-theme attribute, not class="dark"
- Tailwind 4: @theme inline directive, no v3 config file
- Tokens in src/tokens/thursdai.ts (copied from Thursday product)
- NEXT_PUBLIC_ vars require server restart to pick up
