# AR Build Atlas

A wiki-style reference mapping the whole landscape of ways to build augmented
reality work: browser WebAR, no-code creator platforms, native and engine
paths, tracking approaches, and hardware/headsets. Each category page has a
comparison table (cost, learning curve, distribution, offline capability,
vibecoding fit) and, where relevant, worked examples from shipped projects.

Live at https://binyoun.github.io/ar-build-atlas/

No build step. Plain HTML, one shared stylesheet, one tiny nav script. Edit
any `.html` file directly and push to `main` to update the live site.

## Structure

- `index.html` — orientation map, decision guide, glossary
- `webar.html` — Three.js, A-Frame + MindAR, WebXR, 8th Wall
- `nocode.html` — Meta Spark, Lens Studio, Adobe Aero, Zapworks, Niantic Studio
- `native.html` — Unity, Unreal, ARKit/RealityKit, ARCore
- `tracking.html` — marker, markerless SLAM, face, hand, GPS, cloud anchors
- `hardware.html` — phone, Quest, Vision Pro, HoloLens, smart glasses
- `assets/css/style.css` — shared house style (dark ground, terracotta accent)
- `assets/js/nav.js` — mobile nav toggle
