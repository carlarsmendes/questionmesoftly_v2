# Question Me Softly v2

Next.js migration of **Question Me Softly** from the original static site into a production-ready app structure.

## Product Goal
Preserve the original full-screen, low-friction experience while preparing the project for multilingual content, shareable question routes, and launch on a custom domain.

## Current Status
- [x] Next.js + TypeScript foundation
- [x] `/play` route with tap/click -> next card
- [x] Type-based background color mapping
- [x] YIQ contrast logic for readable text
- [x] Original help modal (`?` button + overlay copy)
- [x] Locale-ready content model with stable IDs
- [x] Locale switcher (`en`, `pt-PT`, `pt-BR`)
- [x] Locale persistence in `localStorage`
- [x] Browser-language default locale resolution
- [ ] No-repeat finite deck + restart state
- [ ] Shareable question routes (`/q/[id]`)
- [ ] Landing page/SEO polish
- [ ] Analytics

## Repository Layout
- `question-me-softly/` -> Next.js app (deploy root in Vercel)
- `question-me-softly/src/app/play/` -> main gameplay UI
- `question-me-softly/src/data/questions.json` -> structured question content
- `question-me-softly/src/types/content.ts` -> core content and locale types
- `question-me-softly/src/lib/locale.ts` -> locale detection/persistence helpers

## Content Model (Locale-Ready)
Questions live in JSON and are keyed by stable IDs:

```json
{
  "id": "q-0001",
  "type": "Likes and Dislikes",
  "source": "https://...",
  "text": {
    "en": "What is your favorite way to spend a day off?",
    "pt-PT": "",
    "pt-BR": ""
  }
}
```

Notes:
- `id` must remain stable once published.
- Keep `type` values consistent with color mapping.
- Empty locale values fall back to English in the UI.

## README Maintenance Rules
Update this README whenever one of these changes:
- New user-facing route or feature
- Content model/schema changes
- Environment/deployment setup changes
- Phase status milestones

Keep the **Current Status** checklist accurate so this file acts as the project truth source.
