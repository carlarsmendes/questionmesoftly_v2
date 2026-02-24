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
- [x] Pack-ready content architecture (`general` + `team`)
- [x] Team Pack MVP deck via `/play?pack=team`
- [ ] No-repeat finite deck + restart state
- [ ] Shareable question routes (`/q/[id]`)
- [ ] Landing page/SEO polish
- [ ] Analytics

## Repository Layout
- `question-me-softly/` -> Next.js app (deploy root in Vercel)
- `question-me-softly/src/app/play/` -> main gameplay UI
- `question-me-softly/content/questions.json` -> canonical question IDs/types/source
- `question-me-softly/content/packs/team.json` -> curated Team Pack deck IDs
- `question-me-softly/content/en/questions.json` -> English text entries
- `question-me-softly/content/pt-pt/questions.json` -> PT-PT text entries
- `question-me-softly/content/pt-br/questions.json` -> PT-BR text entries
- `question-me-softly/src/types/content.ts` -> core content and locale types
- `question-me-softly/src/lib/locale.ts` -> locale detection/persistence helpers

## Content Model (Locale-Ready)
Canonical question schema:

```json
{
  "id": "q-0001",
  "type": "Likes and Dislikes",
  "source": "https://...",
  "packs": ["general"]
}
```

Per-language entry schema:

```json
{
  "id": "q-0001",
  "language": "pt-PT",
  "text": "Qual e a tua forma favorita de passar um dia de folga?"
}
```

Notes:
- `id` must remain stable once published.
- Keep `type` values consistent with color mapping.
- All locale files must contain the same set of `id`s.
- Canonical questions include `packs` as an array (currently all in `general`).

## README Maintenance Rules
Update this README whenever one of these changes:
- New user-facing route or feature
- Content model/schema changes
- Environment/deployment setup changes
- Phase status milestones

Keep the **Current Status** checklist accurate so this file acts as the project truth source.
