# Native Personalization — Variant Segment Selector — Filter by Channels

An interactive UX prototype for **CoreMedia Content Studio's Native Personalization** feature. It explores a design variant for the segment/profile selector that lets editors filter the available segments by channel (website) before assigning them to a content variant.

The prototype is live at:  
**https://jonasaschmidt-cm.github.io/Nativepersonalizationvariantsegmentselectorchannelfilter-dev/**

The original Figma design file is at:  
https://www.figma.com/design/eGUd1gIAQgq5cehwx8iIYX/Native-Personalization---Variant---Filter-Segments-Profiles-by-Channels

---

## What this prototype shows

- A **segment selector dropdown** inside a collapsible "Segmentation" panel, matching the Content Studio UI.
- A **"Filter by Channels"** section at the top of the dropdown with togglable channel chips (one per website/channel in the CMS). Selecting one or more chips filters the segment list to only show segments associated with those channels.
- An optional **"All Channels"** chip representing globally available segments.
- A **search field** that filters both channels and segments simultaneously, with optional match highlighting.
- A **TweaksMenu** floating panel (bottom-right) that exposes all variant feature flags so the design space can be explored interactively without code changes:
  - Show/hide channel chips on segment rows
  - Sticky channel filter header
  - Show segment/channel counts
  - Show "All Channels" chip
  - Show profile counts
  - Show/hide "Clear selected" link
  - Highlight search matches

---

## Development

This repo is the working copy, decoupled from Figma Make. The original Figma Make output lives at `figma-make` remote and should not be pushed to manually.

```bash
pnpm install   # install dependencies
pnpm dev       # start dev server at http://localhost:5173/Nativepersonalizationvariantsegmentselectorchannelfilter-dev/
pnpm build     # production build → dist/
```

Pushes to `main` automatically deploy to GitHub Pages via GitHub Actions.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a full history of changes.
