# Question Me Softly

Question Me Softly is a minimalist conversation deck designed for reflective prompts across friends, teams, partners, or solo use.

## Current Product Scope
- Landing page at `/` with manifesto-style brand copy
- Main deck at `/play` with tap/click-to-next full-screen interaction
- Shareable question route at `/q/[id]`
- Privacy page at `/privacy`

## Implemented Features
- Stable question IDs and structured content model
- Locale support: `en`, `pt-PT`, `pt-BR`
- Locale toggle with persistence via `localStorage`
- Browser-language locale bootstrap when supported
- Type-to-color mapping for card backgrounds
- Readable text contrast logic (YIQ-based)
- Finite no-repeat deck behavior
- End-state with restart flow
- Team pack support via `/play?pack=team`
- Inactive question support (`isActive`) for controlled visibility
- Share action with native mobile share fallback to copy link

## Analytics
Umami is integrated globally and tracks anonymous usage analytics.

Tracked events:
- `language_change`
- `deck_restart`
- `share_click`
- `question_next` (optional product event)

## Content Architecture
- `content/questions.json`: canonical question metadata (`id`, `type`, `packs`, `isActive`, optional `source`)
- `content/en/questions.json`: English text by `id`
- `content/pt-pt/questions.json`: European Portuguese text by `id`
- `content/pt-br/questions.json`: Brazilian Portuguese text by `id`
- `content/packs/team.json`: Team pack curation by question IDs

## Notes
- IDs are stable and intended for long-term share links.
- Locale files are expected to stay aligned by ID.
- Packs are controlled decks built from canonical IDs.
