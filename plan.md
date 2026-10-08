# RoleForge MVP Plan

## Product scope
RoleForge is a responsive web MVP for an AI role-play and coaching product for frontline customer-service teams. This first demo uses realistic local/mock data and does not require authentication, a database, an external API key, or a live Claude integration.

The demo must make the core value obvious: agents practice difficult customer conversations, receive multi-turn contextual replies, and get a post-session scorecard; managers can inspect team readiness and coaching priorities. The product is framed honestly as a prototype with Claude planned for dynamic roleplay, SOP grounding, and coaching in the next stage.

## Implementation approach
- Use a dependency-light static web app served by a small Node HTTP server on port 3000.
- Keep product state in the browser: selected scenario, language, difficulty, transcript, current session state, completed sessions, and active navigation view.
- Render Dashboard, Scenarios, Roleplay, and Insights as client-side views without external routing dependencies.
- Seed realistic scenarios and deterministic customer responses so the demo is reliable for a pitch.
- Implement score calculation locally from the conversation choices and show a feedback report with five competencies: empathy, accuracy, policy compliance, escalation judgment, and overall readiness.
- Use responsive CSS with a deliberately editorial SaaS layout rather than a generic centered card grid.

## Project structure
- `index.html`: application shell and semantic mount point.
- `src/app.js`: state, seeded product data, view rendering, role-play transitions, and score logic.
- `src/styles.css`: responsive visual system, layout, components, states, and motion.
- `server.mjs`: zero-dependency static server that honors `PORT` and serves `public`/root files.
- `public/manus-routes.json`: route manifest for the dashboard-style client routes.
- `app.config.ts`: platform logo metadata.
- `TODO.md`: outcome criteria tracked for the MVP.

## Design direction
- **Design movement:** Editorial operations console meets calm AI-native SaaS—think a premium support-ops workspace with a warm paper surface and instrument-panel precision.
- **Core principles:** 1) make readiness measurable, 2) put the next action near the evidence, 3) keep human coaching visible, 4) use motion sparingly to signal progress.
- **Color philosophy:** Ink navy and soft cream create trust and focus; acid lime is reserved for readiness/progress moments; lavender and coral separate AI/customer signals without feeling playful.
- **Layout paradigm:** A left rail anchors the workspace while content uses asymmetric split panels: a narrative status column paired with evidence and action cards. Role-play uses a wide conversation stage with a compact session control rail.
- **Signature elements:** thin meter bars with lime fill, pill-shaped AI/customer labels, and a small circular “signal” mark built from nested rings.
- **Interaction philosophy:** Every click should either start practice, reveal evidence, or move a session forward. Empty states should suggest a next action. Controls use explicit labels rather than icon-only affordances.
- **Animation:** 160–220ms ease-out transitions for view changes, subtle meter fill, live typing indicator, and a single pulse on the AI signal mark while the customer is “thinking.” Respect reduced motion.
- **Typography system:** Use Inter/system sans for controls and data, with a restrained serif display treatment using Georgia for major headlines to give the product an editorial, human coaching feel. Strong hierarchy: 12px uppercase labels, 14–16px body, 24–40px display.
- **Brand essence:** “The practice floor for customer-service readiness.” Personality: grounded, sharp, encouraging.
- **Brand voice:** Direct, practical, supportive. Example lines: “Practice the moment that usually breaks the script.” and “You’re close—escalate earlier when policy risk rises.”
- **Wordmark & logo:** “RoleForge” paired with a nested-ring signal mark suggesting a conversation becoming competence.
- **Signature brand color:** readiness lime `#c5f36a`, used sparingly as a recognizable signal against ink navy `#17212b`.

## Required behavior
- Dashboard shows readiness summary, stats, progress, and a data-backed focus recommendation.
- Scenarios view supports browsing/filtering scenario cards and starting a selected scenario.
- Session setup allows Bahasa Indonesia or English and Easy/Standard/Hard difficulty.
- Roleplay is multi-turn: the user chooses responses as the agent and the mock AI customer replies contextually; the session reaches a real completion state.
- Transcript distinguishes agent messages from AI customer messages.
- Feedback shows the five required scores, rationale, strengths, and next practice suggestion.
- Insights shows mock team readiness trend, competence breakdown, and priority coaching areas.
- Roadmap copy explicitly says Claude is planned, not currently integrated.
- Layout works at desktop and mobile widths.
