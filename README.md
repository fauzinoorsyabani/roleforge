# RoleForge

RoleForge is an AI-native customer-service role-play and coaching MVP for frontline teams. Agents practice difficult conversations with a mock customer, receive contextual feedback, and review readiness signals across empathy, accuracy, policy compliance, and escalation judgment.

## Current MVP

This demo is intentionally dependency-light and uses deterministic local data so it can be shown reliably in an early-stage startup application. It includes Dashboard, Scenarios, Session Setup, multi-turn Roleplay, Feedback, and Manager Insights views. Claude integration is planned for the next stage to power dynamic customer behavior, SOP grounding, and coaching reports; this repository does not claim that live integration is active.

## Run locally

```bash
npm run dev
```

The development server listens on `http://localhost:3000` and honors the `PORT` environment variable. Vercel serves the same app as a static SPA, so browser assets load directly from `src/` and route rewrites only apply to app pages.

## Product thesis

Customer-service teams need realistic, repeatable practice before agents speak with real customers. RoleForge turns a company’s training workflow into a measurable practice loop: simulate the hard moment, see the next best move, and coach the pattern—not just the call.
