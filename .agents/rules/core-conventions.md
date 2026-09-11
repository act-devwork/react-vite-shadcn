# Core conventions

## Project baseline

- Use Node.js 20 or newer, React 19, TypeScript, Vite, and the `@/` alias for code under `src`.
- Preserve the existing architecture: domain types in `src/types`, API access in `src/services`,
  server-state hooks in `src/hooks`, shared client state in `src/stores`, validation in
  `src/utils/validators`, reusable components in `src/components`, and route-level composition in
  `src/views`.
- Reuse the existing Tailwind 4 semantic tokens and shadcn/Radix primitives in `src/components/ui`.
- Keep changes scoped. Do not reformat or refactor unrelated code while implementing a task.
- Do not add debug logging, secrets, generated output, or build artifacts to source control.

## Naming and language

- Write source code, identifiers, comments, UI copy, validation messages, and developer
  documentation in English unless a requirement explicitly asks for another language.
- Use kebab-case file names, PascalCase React component names, camelCase variables/functions, and
  `use`-prefixed names for hooks.
- Reuse domain enums, mappings, query keys, constants, and formatter helpers. Do not scatter magic
  role, status, event, route, storage, or date-format strings through components.

## Imports and exports

- Use `@/` imports across source directories. Use relative imports only for files in the same small
  module, such as a component and its local helper.
- Mark type-only imports with `import type` to comply with `verbatimModuleSyntax`.
- Follow the surrounding export style: views and major components commonly use default exports;
  hooks, services, stores, types, constants, and utilities commonly use named exports.
- Add an export to an existing barrel file only when that directory already exposes the same kind
  of module through the barrel. Do not introduce a new barrel solely to shorten one import.

## Formatting and maintainability

- Use the configured Prettier style: semicolons, single quotes, two spaces, trailing commas, and a
  100-character print width. Do not hand-align code with spaces.
- Remove unused code instead of commenting it out.
- Write comments to explain non-obvious decisions, constraints, or workarounds—not to narrate what
  the code already says.
- Preserve backward compatibility for shared components, hooks, stores, and service functions
  unless all callers are updated in the same change.
