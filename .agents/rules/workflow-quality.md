# Workflow and quality

## Dependencies and repository hygiene

- Prefer the libraries already installed. Add a dependency only when existing platform APIs and
  project utilities cannot solve the requirement cleanly.
- Use npm for repository commands because the Docker build and verification workflow use npm.
- When dependencies change, update `package-lock.json`; do not modify both lockfiles unless the task
  explicitly requires keeping npm and Yarn in sync.
- Do not manually edit generated output under `dist` or third-party code under `node_modules`.
- Keep environment-specific values out of source files. Update `.env-example` when adding a required
  environment variable, using a safe placeholder value.
- Avoid drive-by dependency upgrades, lockfile churn, file renames, or broad formatting in a
  feature/fix change.

## Verification

- Run the narrowest relevant checks during development.
- Before handoff, run `npm run prettier:check`, `npm run lint`, and `npm run build` when the change
  affects source or configuration.
- The repository currently has no automated test script. For behavior with meaningful branching,
  document the manual states verified; if adding a test framework is in scope, add focused tests.
- Report pre-existing failures separately from failures introduced by the change.
- Review the final diff for accidental files, secrets, debug code, unrelated formatting, stale
  imports, and incomplete loading/error/permission states.
