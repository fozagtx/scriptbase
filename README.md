# scriptbase

A landing page for a Storytelling Craft AI workflow that turns Claude or
ChatGPT into a coach for retention-driven video content. Pick your model,
grab the prompt, write hooks people can't scroll past.

Built with Svelte 5 + Vite.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

The dev server runs at <http://127.0.0.1:5174/>.

## Structure

```
src/
  App.svelte             # page composition
  app.css                # design tokens (colors, fonts, gradients, shadows)
  main.js                # mount entry
  lib/
    Header.svelte        # floating centered nav
    Hero.svelte          # headline + YouTube reference card
    DemoSection.svelte   # demo GIF + watch/skip CTAs
    PromptSection.svelte # toggle + rendered prompt card
    prompts.js           # the Claude and ChatGPT prompt bodies
public/
  demo.gif               # (optional) drop your walkthrough GIF here
```

## Customization

- **The prompt itself** lives in `src/lib/prompts.js`. Edit `SKILL_BODY` to
  change the storytelling framework both models receive.
- **The demo GIF** is loaded from `/demo.gif`. Drop your file at
  `public/demo.gif` and it auto-renders in the demo section.
- **Brand tokens** (colors, fonts, gradients, radii, shadows) are defined
  as CSS variables at the top of `src/app.css`.

## Reference

Source video that informed the storytelling framework:
<https://youtu.be/jqdEqfHD22A>
