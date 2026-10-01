# Floating-letter navigation for “lets see through my eyes?”

## What will change
- Keep the section heading, introduction, all 12 existing entries, closing line, typography, colors, and card presentation unchanged.
- Replace the always-visible stacked card list with twelve floating letter controls in this exact sequence: `V A I B A V B A L A J I`.
- Map each letter by position to its current entry, so duplicate letters still open the correct individual entry.
- Open one selected entry at a time with a smooth reveal, then provide a clear back control to return to all twelve letters.
- Arrange the letters as a polished, cinematic constellation that remains readable and easy to tap on desktop and mobile, with subtle staggered floating motion and reduced-motion support.

## Technical details
- Reuse the existing `eyeLines` data and current expanded-card markup inside `ThroughMyEyes`.
- Replace the current open-card index state with a selected-letter index and render either the letter chooser or its matching card.
- Add only section-specific motion utilities to the global styles, without changing any other website section.
- Verify the chooser, all mappings, back interaction, mobile layout, and current page metadata/build health.
