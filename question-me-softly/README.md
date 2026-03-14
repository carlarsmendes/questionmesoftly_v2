# Question Me Softly

Question Me Softly is a minimalist conversation deck designed for reflective prompts across friends, teams, partners, or solo use.

## Current Product Scope
- Landing page at `/` with multilingual brand copy and support section
- Main deck at `/play` with tap/click-to-next full-screen interaction
- Shareable question route at `/q/[id]` (opens exact question and allows continuing to deck)
- Privacy page at `/privacy`

## Implemented Features
- Stable question IDs and structured content model
- Locale support: `en`, `pt-PT`, `pt-BR`
- Locale toggle on landing, deck, and shared-question screens
- Locale persistence via `localStorage`
- Browser-language locale bootstrap when supported
- Type-to-color mapping for card backgrounds
- Readable text contrast logic (YIQ-based)
- Finite no-repeat deck behavior
- End-state with restart flow
- Team pack support via `/play?pack=team`
- Team pack easter-egg link on landing page
- Inactive question support (`isActive`) for controlled visibility
- Share action with native mobile share fallback to copy link
- Support CTA section linking to Buy Me a Coffee

## Analytics
Umami is integrated globally and tracks anonymous usage analytics.

Status: configured and actively tracking in production.

Tracked events:
- `pageview` (automatic via Umami script)
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
- Question categories can be localized in UI by locale while keeping canonical category keys in content.
