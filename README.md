# Caravane de l'Espoir pour la Scolarisation — قافلة الأمل للتمدرس

One-page website (French / Arabic) for a solidarity caravan bringing school supplies, tutoring and reading corners to mountain schools in the Middle and High Atlas, Morocco.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?lang=ar` to open the Arabic version directly.

## Structure

- `src/app/` — layout (fonts, metadata), page and global styles
- `src/components/caravane/` — sections, SVG illustrations and the journey animation
- `src/components/caravane/i18n/translations.ts` — all French and Arabic text

## Before going live

- The contact form only shows a confirmation; connect it to an email service or API route (`PartnerSection.tsx`).
- The e-mail address, phone number and social links in `Footer.tsx` are placeholders.
