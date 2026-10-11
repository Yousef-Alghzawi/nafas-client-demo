# Nafas by Wujood

Interactive Arabic and English mobile app prototype for client presentations.

Live demo: https://yousef-alghzawi.github.io/nafas-client-demo/

## Preview locally

Run `python -m http.server 8000` in this directory, then open http://localhost:8000.

## Deployment

GitHub Pages publishes the root of the `main` branch. `.nojekyll` preserves the exported design system directory.

## Demo behavior

The interface includes a check-in flow, breathing exercises, grounding, journaling, trends, support, and settings. Data is held in memory and resets on reload. Account, provider, and trend content is illustrative; this repository is a presentation prototype without a backend.

React, React DOM, Babel, and fonts are loaded from public CDNs by the exported runtime.
