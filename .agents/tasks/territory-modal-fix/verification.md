# Verification — Territory modal left column

## Required validation matrix

Run from `/Applications/MAMP/htdocs/Production_Vigneair/vigenair_migration_node/.worktrees/territory-modal-left-column/ui/src/ui`:

- `./node_modules/.bin/tsc -p tsconfig.app.json --noEmit` — **PASS** (exit 0, no diagnostics). The initial attempt before dependency installation returned exit 127 because this worktree did not yet contain `node_modules`; `npm ci` was then run successfully from the checked-in lockfile and the type-check passed on both subsequent runs.
- `npm test -- --watch=false --browsers=ChromeHeadless` — **PASS** (exit 0): Chrome Headless 154, **22/22 SUCCESS**. An earlier run found one stale-element assertion in the new component spec (21 pass, 1 fail); the assertion was corrected to query the post-change DOM and the complete suite passed.
- `npm run build -- --configuration development` — **PASS** (exit 0): Angular application bundle generated successfully, 7.51 MB initial development bundle. One parallel invocation was interrupted by contention with the production build; it was rerun alone and passed.
- `npm run build -- --configuration production` — **PASS** (exit 0): Angular application bundle generated successfully, 7.47 MB initial production bundle.

Additional focused command:

- `npm test -- --watch=false --browsers=ChromeHeadless --include src/app/report/territory-modal/territory-modal.adapter.spec.ts` — the first parallel attempt exited before Karma emitted diagnostics; the same adapter specs were included in the successful complete 22-test run.

## Coverage and inspection

- Headless DOM tests verify the fixed left rail in both Oportunidades and Adaptaciones, opportunity selection updating the right detail, real-card filtering, strict `KEEP | EXPLORE | ADAPT` output, and isolation of sections 04/05 outside the modal.
- Adapter tests verify API field lineage, flattened adaptation counts, honest unavailable/empty states, and taxonomy.
- Angular development and production template compilation passed; scoped modal sources introduce no new `any`.
- Inspected active markup confirms `<app-creative-services-section>` and `<app-testing-framework-section>` occur before and outside `.v2-territory-modal-overlay`.
- Confirmed `environment.ts` retains `production: true` and `enableReportMocks: false`; development alone has mocks enabled.
- No persistent server was started, so no manual screenshot was captured. Visual validation used ChromeHeadless DOM rendering plus direct responsive/style inspection: desktop split rail/right content, four-column detail, wrapping card grid, narrow-screen stacked rail, horizontal adaptation cards, internal scrolling, and `:focus-visible` rules are present.
- A repository-wide `git diff --check` reports pre-existing trailing whitespace in `ui/src/ui/src/styles.css` lines 71, 75, and 83, outside this task. The modal-scoped files have no whitespace errors.

No backend files, `modal.html`, Creative Services, or Testing Framework components were edited by this task. No commit was created, per the authoritative task instruction.
