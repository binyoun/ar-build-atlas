/* AR Build Atlas. Single source of truth for every option across all five
   category tables. Category pages render their <tbody> from this array
   (see render.js); search.js indexes the same array. Keep this the only
   place option text lives, edit here, not in the HTML tables. */

var AR_CATEGORIES = {
  webar:    { label: "WebAR",                         page: "webar.html" },
  nocode:   { label: "No-code / creator platforms",    page: "nocode.html" },
  native:   { label: "Native and engine",              page: "native.html" },
  tracking: { label: "Tracking approaches",            page: "tracking.html" },
  hardware: { label: "Hardware and headsets",          page: "hardware.html" }
};

var AR_OPTIONS = [

  /* WebAR */
  {
    id: "three-js", category: "webar", name: "Three.js",
    what: "A JavaScript 3D library over WebGL. No AR-specific layer built in; you supply your own camera feed, tracking, and anchoring.",
    cost: "Free, open source", costTier: "free",
    learning: "Steep at first (matrices, shaders, render loop), then very flexible",
    distribution: "URL, any modern browser", distTier: "url",
    offline: "Yes, if all assets are self-hosted rather than pulled from a CDN at runtime", offlineTier: "yes",
    fit: "High. Plain text files, exactly what a coding agent is best at.", fitTier: "high",
    usedIn: "Uncanny Garden, Touch of Water, gelora-soil (vanitas)"
  },
  {
    id: "aframe-mindar", category: "webar", name: "A-Frame + MindAR",
    what: "A-Frame is a declarative, HTML-like layer over Three.js. MindAR adds image and face tracking on top.",
    cost: "Free, open source", costTier: "free",
    learning: "Gentle. Scenes read almost like markup rather than 3D code.",
    distribution: "URL", distTier: "url",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "High. Config-driven setups (one entry per work) fit an agent well.", fitTier: "high",
    usedIn: "Elemental WebAR (RMIT teaching kit)"
  },
  {
    id: "babylon-js", category: "webar", name: "Babylon.js",
    what: "A JavaScript 3D engine in the same territory as Three.js, but with more built in out of the box: a hosted node material editor, physics, and animation curve tooling.",
    cost: "Free, open source", costTier: "free",
    learning: "Medium to steep, similar to Three.js, with less that needs to be hand-built",
    distribution: "URL", distTier: "url",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "High. Same plain-JS profile as Three.js.", fitTier: "high",
    usedIn: null
  },
  {
    id: "playcanvas", category: "webar", name: "PlayCanvas",
    what: "A WebGL game engine with both a hosted, collaborative visual editor for scene assembly and a code layer for behavior, sitting between Three.js's roll-your-own approach and a full desktop engine.",
    cost: "Free tier, paid tiers for private projects and team seats", costTier: "freemium",
    learning: "Medium. The editor covers layout, code covers logic.",
    distribution: "URL, either self-hosted export or a PlayCanvas-hosted link", distTier: "url",
    offline: "Yes, if exported and self-hosted", offlineTier: "yes",
    fit: "Medium. The code layer is agent-friendly, but scene setup lives in their hosted editor, not in files an agent can edit directly.", fitTier: "med",
    usedIn: null
  },
  {
    id: "model-viewer", category: "webar", name: "model-viewer",
    what: "Google's <code>&lt;model-viewer&gt;</code> web component: one HTML tag drops a 3D model into a page and hands off to the phone's native AR viewer (Scene Viewer on Android, AR Quick Look on iOS) instead of running its own AR session.",
    cost: "Free, open source", costTier: "free",
    learning: "Very low, one HTML tag",
    distribution: "URL for the page; the AR view itself opens the OS-level viewer app", distTier: "url",
    offline: "The model file can be self-hosted; the OS viewer itself is a system component you do not control", offlineTier: "partial",
    fit: "Medium for the web page itself, but there is no custom AR interaction to build since the OS viewer owns that part entirely.", fitTier: "med",
    usedIn: null
  },
  {
    id: "webxr-device-api", category: "webar", name: "WebXR Device API",
    what: "The browser's own native immersive-ar session API: real 6dof tracking and hit-testing, no third-party library required.",
    cost: "Free", costTier: "free",
    learning: "Medium. The API itself is small, but browser support gaps force workarounds.",
    distribution: "URL, Chrome for Android only in practice; no iOS Safari support as of this writing", distTier: "url",
    offline: "Yes", offlineTier: "yes",
    fit: "Medium. The gap is platform support, not code complexity.", fitTier: "med",
    usedIn: null
  },
  {
    id: "8th-wall", category: "webar", name: "8th Wall",
    what: "A hosted SDK (now under Niantic Spatial) that adds robust 6dof world tracking and image tracking to the browser, including on iOS Safari where raw WebXR does not reach.",
    cost: "Subscription, tiered by traffic and features", costTier: "subscription",
    learning: "Medium. Mostly wiring their JS APIs and camera pipeline rather than building tracking from scratch.",
    distribution: "URL", distTier: "url",
    offline: "No. Requires their runtime and a license check at load time.", offlineTier: "no",
    fit: "Medium. Still text-based code, but you are working inside their SDK's constraints rather than a fully open stack.", fitTier: "med",
    usedIn: null
  },

  /* No-code, social and marketing */
  {
    id: "meta-spark-studio", category: "nocode", group: "social", name: "Meta Spark Studio",
    what: "Desktop node-graph editor for effects published to Instagram and Facebook's camera.",
    cost: "Free", costTier: "free",
    learning: "Low for basic effects, medium once you add its JavaScript scripting layer.",
    distribution: "Locked to Meta's apps", distTier: "platform-locked",
    offline: "No, needs the Meta app camera", offlineTier: "no",
    fit: "Low. The graph and asset work happens inside the desktop app; a coding agent can help with the scripting layer only.", fitTier: "low",
    usedIn: null
  },
  {
    id: "lens-studio", category: "nocode", group: "social", name: "Lens Studio (Snap)",
    what: "Desktop editor for Snapchat Lenses, with an effect graph plus a real JavaScript scripting API for custom behavior.",
    cost: "Free", costTier: "free",
    learning: "Low to medium",
    distribution: "Snapchat only", distTier: "platform-locked",
    offline: "No, needs Snapchat's camera", offlineTier: "no",
    fit: "Low to medium. Scripts are text and agent-friendly; the visual graph and asset wiring are not.", fitTier: "med",
    usedIn: null
  },
  {
    id: "adobe-aero", category: "nocode", group: "social", name: "Adobe Aero",
    what: "Mobile and desktop app for placing 3D content and simple interactions into real space, built for designers rather than developers.",
    cost: "Free tier, paid Creative Cloud tiers for more", costTier: "freemium",
    learning: "Low. Drag, drop, and trigger logic, no code.",
    distribution: "Aero app, or a shareable web link/embed", distTier: "platform-locked",
    offline: "Aero app needed, no browser-only path", offlineTier: "no",
    fit: "Low. This is a visual-first tool by design.", fitTier: "low",
    usedIn: null
  },
  {
    id: "zapworks", category: "nocode", group: "social", name: "Zapworks (Zappar)",
    what: "Web-based no-code builder for image and world tracking, with an optional JavaScript layer (ZapWorks Studio) for custom logic.",
    cost: "Subscription, tiered", costTier: "subscription",
    learning: "Low to medium",
    distribution: "Zappar app, or WebAR via a universal link", distTier: "platform-locked",
    offline: "No, needs their runtime", offlineTier: "no",
    fit: "Low to medium. The scripting layer is agent-friendly, the builder is not.", fitTier: "med",
    usedIn: null
  },
  {
    id: "niantic-studio", category: "nocode", group: "social", name: "Niantic Studio",
    what: "A visual, no-code builder layered on top of 8th Wall's WebAR tracking, aimed at non-developers who still want a URL-based result.",
    cost: "Subscription", costTier: "subscription",
    learning: "Low",
    distribution: "URL", distTier: "url",
    offline: "No", offlineTier: "no",
    fit: "Low. Same tracking engine as 8th Wall underneath, but the no-code layer removes most of the room for hand-written code.", fitTier: "low",
    usedIn: null
  },
  {
    id: "blippbuilder", category: "nocode", group: "social", name: "Blippbuilder (Blippar)",
    what: "A web-based, no-code AR campaign builder aimed at brands and marketing: drag-and-drop scenes with image or plane tracking.",
    cost: "Subscription", costTier: "subscription",
    learning: "Low to medium",
    distribution: "Blippar app, or a WebAR link depending on plan", distTier: "platform-locked",
    offline: "No", offlineTier: "no",
    fit: "Low. Same profile as the other builder tools above.", fitTier: "low",
    usedIn: null
  },

  /* No-code, artist and gallery */
  {
    id: "artivive", category: "nocode", group: "artist", name: "Artivive",
    what: "A platform built specifically for artists: upload a video or animation, tag a printed image, canvas, or artwork as the trigger, and visitors view it through the Artivive app or an embeddable web view.",
    cost: "Free tier for a small number of works, paid tiers for more", costTier: "freemium",
    learning: "Very low. Upload media, tag a trigger image, done.",
    distribution: "Artivive app, or an embeddable WebAR view on higher tiers", distTier: "platform-locked",
    offline: "No, needs the app or a live web view", offlineTier: "no",
    fit: "Low. This is upload-and-tag, not a coding surface at all.", fitTier: "low",
    usedIn: null
  },
  {
    id: "eyejack", category: "nocode", group: "artist", name: "EyeJack",
    what: "Another artist and gallery-focused AR platform, similar image-trigger model to Artivive, with its own app and curation tools aimed at exhibitions and print/canvas work.",
    cost: "Subscription, tiered", costTier: "subscription",
    learning: "Low",
    distribution: "EyeJack app", distTier: "platform-locked",
    offline: "No", offlineTier: "no",
    fit: "Low, same profile as Artivive above.", fitTier: "low",
    usedIn: null
  },

  /* Native and engine */
  {
    id: "unity-ar-foundation", category: "native", name: "Unity + AR Foundation",
    what: "Cross-platform game engine (C#) with a unified layer over ARKit and ARCore, so one project targets both iOS and Android.",
    cost: "Free up to a revenue and funding threshold, then a paid plan", costTier: "freemium",
    learning: "Medium to high: the engine, its editor, and C# all need learning together",
    distribution: "App store, or a sideloaded build", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium. An agent can write solid C# scripts, but scene assembly, prefab wiring, and inspector settings happen by hand in the Unity Editor.", fitTier: "med",
    usedIn: null
  },
  {
    id: "unity-vuforia", category: "native", name: "Unity + Vuforia",
    what: "An image and object-tracking plugin for Unity, useful when AR Foundation's built-in tracking is not precise enough for a specific physical object.",
    cost: "Adds a separate license cost on top of Unity", costTier: "subscription",
    learning: "Medium, on top of Unity's own curve",
    distribution: "Same as Unity above", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium, same constraint as Unity above.", fitTier: "med",
    usedIn: null
  },
  {
    id: "lightship-ardk", category: "native", name: "Niantic Lightship ARDK",
    what: "A native SDK from Niantic Spatial (with a Unity plugin) adding spatially aware AR beyond basic plane detection: semantic segmentation of the camera feed (sky, ground, buildings, people), meshing, and depth.",
    cost: "Free tier, usage-based paid tiers", costTier: "freemium",
    learning: "Medium to high, an additional SDK layered on top of Unity or native iOS/Android",
    distribution: "App store", distTier: "app-store",
    offline: "Yes once installed, though some features depend on cloud services", offlineTier: "yes",
    fit: "Medium, same constraint as Unity above: scripts are agent-friendly, engine wiring is not.", fitTier: "med",
    usedIn: null
  },
  {
    id: "unreal-engine-ar", category: "native", name: "Unreal Engine (AR)",
    what: "C++ and Blueprints, aimed at the highest-fidelity real-time visuals, with an AR framework layered over ARKit/ARCore.",
    cost: "Free until a revenue threshold, then a royalty", costTier: "freemium",
    learning: "High. The heaviest engine here, with the steepest ramp.",
    distribution: "App store", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Low. Blueprint visual scripting does not map well to a text-based coding agent, and C++ plus the editor is a heavier lift than the other options here.", fitTier: "low",
    usedIn: null
  },
  {
    id: "arkit-realitykit", category: "native", name: "ARKit + RealityKit",
    what: "Apple's native AR framework and 3D renderer, written in Swift, for iOS, iPadOS, and visionOS.",
    cost: "Free, but needs a Mac plus a paid Apple Developer account (about 99 USD a year) to distribute", costTier: "freemium",
    learning: "Medium. Swift itself is approachable; Xcode's project and interface tooling is not.",
    distribution: "App Store, or ad-hoc install", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium. An agent can write Swift well, but testing needs a physical iPhone or simulator and a Mac, which is a real barrier outside that ecosystem.", fitTier: "med",
    usedIn: null
  },
  {
    id: "arcore-kotlin", category: "native", name: "ARCore + Kotlin",
    what: "Google's native AR framework for Android, in Kotlin or Java, the Android counterpart to ARKit.",
    cost: "Free, needs an Android Developer account (one-time fee) to publish", costTier: "freemium",
    learning: "Medium, similar profile to ARKit",
    distribution: "Google Play, or a sideloaded APK", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium, same profile as ARKit above.", fitTier: "med",
    usedIn: null
  },
  {
    id: "openxr", category: "native", name: "OpenXR",
    what: "An open, cross-platform standard (not a single vendor's product) for VR/AR APIs, meant to let one codebase target multiple headsets and runtimes without separate vendor-specific code paths.",
    cost: "Free, an open specification with open implementations", costTier: "free",
    learning: "High. Usually worked with through an engine (Unity, Unreal) rather than raw.",
    distribution: "Depends on the target platform's app store", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Low to medium, same constraint as whichever engine it is paired with.", fitTier: "med",
    usedIn: null
  },
  {
    id: "snapdragon-spaces", category: "native", name: "Snapdragon Spaces",
    what: "Qualcomm's AR developer platform for Snapdragon-powered smart glasses and headsets: hand tracking, plane detection, and image tracking as a native SDK aimed at emerging XR hardware built on Qualcomm chips.",
    cost: "Free SDK; hardware determines the real cost", costTier: "freemium",
    learning: "Medium to high",
    distribution: "App store or sideload, tied to Snapdragon-based devices", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium, same constraint as Unity/native above.", fitTier: "med",
    usedIn: null
  },

  /* Tracking approaches */
  {
    id: "image-marker-tracking", category: "tracking", name: "Image / marker tracking",
    what: "Recognizes a flat printed image (MindAR, Vuforia, 8th Wall image targets) and anchors content to it. The most reliable and lowest-compute option, at the cost of needing a physical printed marker.",
    cost: "Free (MindAR) to subscription (Vuforia, 8th Wall)", costTier: "freemium",
    learning: "Low to medium",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "High, with MindAR specifically.", fitTier: "high",
    usedIn: "Elemental WebAR (RMIT teaching kit)"
  },
  {
    id: "object-tracking", category: "tracking", name: "Object tracking",
    what: "Recognizes and tracks a specific 3D object, not just a flat image, so content anchors to it correctly from any angle (Vuforia Object Targets, ARKit Object Detection against a pre-scanned reference object).",
    cost: "Free (ARKit) to subscription (Vuforia)", costTier: "freemium",
    learning: "Medium to high; needs a pre-scanned 3D reference of the object, not just a photo",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "Medium. The scanning and reference-object step is a real workflow step outside code, not something an agent can shortcut.", fitTier: "med",
    usedIn: null
  },
  {
    id: "markerless-slam", category: "tracking", name: "Markerless SLAM / plane detection",
    what: "The phone maps the room live and tracks its own position in it, no printed marker needed (ARKit, ARCore, WebXR hit-test).",
    cost: "Free, bundled into the platform", costTier: "free",
    learning: "Medium to high: more compute, more edge cases (lighting, texture-poor surfaces)",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Yes", offlineTier: "yes",
    fit: "Medium, and platform-dependent.", fitTier: "med",
    usedIn: null
  },
  {
    id: "face-tracking", category: "tracking", name: "Face tracking",
    what: "A live face mesh drives effects (MediaPipe FaceLandmarker, ARKit ARFaceAnchor, or Lens Studio and Spark's built-in face effects).",
    cost: "Free (MediaPipe, ARKit, ARCore) to platform-locked (Lens Studio, Spark)", costTier: "freemium",
    learning: "Medium",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "High, with MediaPipe specifically.", fitTier: "high",
    usedIn: "gelora-soil (vanitas), grow-from-the-mouth mode"
  },
  {
    id: "hand-tracking", category: "tracking", name: "Hand tracking",
    what: "Live hand landmarks drive gesture and interaction (MediaPipe HandLandmarker, or ARKit/Vision hand pose).",
    cost: "Free", costTier: "free",
    learning: "Medium",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "High, with MediaPipe specifically.", fitTier: "high",
    usedIn: "Uncanny Garden, gelora-soil (vanitas), palm mode"
  },
  {
    id: "body-pose-tracking", category: "tracking", name: "Body / pose tracking",
    what: "Full-body skeletal tracking (MediaPipe Pose Landmarker, ARKit and ARCore's body tracking) drives effects from a person's whole posture rather than a hand or face alone.",
    cost: "Free (MediaPipe, ARKit, ARCore)", costTier: "free",
    learning: "Medium, similar profile to hand and face tracking",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Yes, if self-hosted", offlineTier: "yes",
    fit: "High with MediaPipe specifically, same as hand and face tracking above.", fitTier: "high",
    usedIn: null
  },
  {
    id: "location-gps-ar", category: "tracking", name: "Location-based / GPS AR",
    what: "Anchors content to real-world coordinates rather than a visual feature, so it appears at the same physical spot for anyone standing there.",
    cost: "Free (raw geolocation) to subscription (8th Wall geo tools)", costTier: "freemium",
    learning: "Medium: GPS accuracy on phones is loose, usually a few meters",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "Partial, needs a live GPS fix", offlineTier: "partial",
    fit: "Medium. Straightforward code, but accuracy is a hardware limit, not a coding one.", fitTier: "med",
    usedIn: "Touch of Water, landing map placement only, not AR anchoring itself"
  },
  {
    id: "depth-lidar-sensing", category: "tracking", name: "Depth / LiDAR sensing",
    what: "A dedicated depth sensor (LiDAR on Pro-model iPhones and iPads) gives precise real-world geometry: accurate occlusion of virtual objects behind real ones, instant plane detection, and room-scale meshing without camera-only SLAM's guesswork.",
    cost: "Free API, but requires LiDAR-equipped hardware specifically", costTier: "free",
    learning: "Medium, mostly ARKit's depth and scene-geometry APIs",
    distribution: "iOS only, and only on LiDAR-equipped devices", distTier: "platform-locked",
    offline: "Yes", offlineTier: "yes",
    fit: "Medium, same constraint as native ARKit work generally.", fitTier: "med",
    usedIn: null
  },
  {
    id: "cloud-anchors", category: "tracking", name: "Cloud anchors",
    what: "A 3D anchor saved to a server so multiple visitors see the same virtual object fixed to the same real spot, together or at different times (ARCore Cloud Anchors, Azure Spatial Anchors).",
    cost: "Free tier then usage-based", costTier: "freemium",
    learning: "Medium to high: adds a backend and multi-device sync on top of tracking itself",
    distribution: "Depends on the chosen platform", distTier: "varies",
    offline: "No, needs the anchor-resolving service", offlineTier: "no",
    fit: "Medium. The client code is agent-friendly; the shared-state backend is a genuinely new piece, not just more of the same.", fitTier: "med",
    usedIn: null
  },

  /* Hardware and headsets */
  {
    id: "handheld-phone", category: "hardware", name: "Handheld phone",
    what: "The default target for everything in the other four categories. A visitor holds their own device, one hand occupied by the phone.",
    cost: "Free, visitors bring their own device", costTier: "free",
    learning: "Whatever the software category above requires",
    distribution: "Whatever the software category above requires", distTier: "varies",
    offline: "Whatever the software category above requires", offlineTier: "varies",
    fit: "Same as the chosen software path.", fitTier: "high",
    usedIn: "Every project behind this atlas"
  },
  {
    id: "meta-quest", category: "hardware", name: "Meta Quest (passthrough MR)",
    what: "Standalone headset with built-in hand tracking and passthrough video, so the real room and virtual content blend without a phone in hand.",
    cost: "One-time hardware cost, no subscription for the device itself", costTier: "paid-hardware",
    learning: "Medium to high, usually via Unity or native SDKs; WebXR-in-headset-browser is a lighter option",
    distribution: "App store (Meta Horizon Store) or sideload", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium. WebXR-in-headset stays vibecodable; the native SDK path inherits the same constraints as the native and engine category.", fitTier: "med",
    usedIn: null
  },
  {
    id: "apple-vision-pro", category: "hardware", name: "Apple Vision Pro",
    what: "visionOS headset, RealityKit and SwiftUI, the highest passthrough fidelity available right now.",
    cost: "Expensive hardware, plus a Mac and Apple Developer account for development", costTier: "paid-hardware",
    learning: "High",
    distribution: "App Store or ad-hoc install", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium, same profile as ARKit in the native and engine category, with a much smaller installed base to reach.", fitTier: "med",
    usedIn: null
  },
  {
    id: "android-xr", category: "hardware", name: "Android XR",
    what: "Google's XR platform (headset hardware from partners such as Samsung) combining passthrough mixed reality with on-device AI assistance, positioned as a newer competitor to Quest and Vision Pro.",
    cost: "Hardware cost varies by manufacturer", costTier: "paid-hardware",
    learning: "Medium to high, via Android XR's SDK, closer in spirit to ARCore than to Unity/Unreal",
    distribution: "Google Play, or sideload", distTier: "app-store",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Medium, similar profile to ARCore development generally.", fitTier: "med",
    usedIn: null
  },
  {
    id: "magic-leap-2", category: "hardware", name: "Magic Leap 2",
    what: "An enterprise-focused optical see-through headset (a genuinely transparent display, not video passthrough), still actively sold into field service, medical, and industrial use cases where HoloLens has pulled back.",
    cost: "Expensive, enterprise-oriented", costTier: "paid-hardware",
    learning: "High",
    distribution: "Enterprise deployment tools, not a consumer app store", distTier: "enterprise",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Low. Niche tooling and a narrow, enterprise-oriented ecosystem.", fitTier: "low",
    usedIn: null
  },
  {
    id: "hololens-2", category: "hardware", name: "HoloLens 2",
    what: "Also an enterprise-focused optical see-through headset. Microsoft has deprioritized new hardware here, so treat this row as legacy rather than a current recommendation.",
    cost: "Expensive, enterprise-oriented", costTier: "paid-hardware",
    learning: "High",
    distribution: "Enterprise deployment tools, not a consumer app store", distTier: "enterprise",
    offline: "Yes, once installed", offlineTier: "yes",
    fit: "Low. Niche tooling and a shrinking ecosystem.", fitTier: "low",
    usedIn: null
  },
  {
    id: "smart-glasses-camera-only", category: "hardware", name: "Smart glasses, camera-only",
    what: "Devices like Ray-Ban Meta glasses: camera, audio, and on-device AI, with no AR visual display at all. Useful for capture and voice interaction, not for showing virtual content.",
    cost: "Consumer hardware pricing", costTier: "paid-hardware",
    learning: "Low, mostly a companion app, no AR display to build for",
    distribution: "Platform-locked companion app", distTier: "platform-locked",
    offline: "No", offlineTier: "no",
    fit: "Low. There is no AR display surface to develop for.", fitTier: "low",
    usedIn: null
  },
  {
    id: "smart-glasses-with-display", category: "hardware", name: "Smart glasses, with display",
    what: "Devices like Snap Spectacles (developer program) and Meta Ray-Ban Display glasses: a real, if limited, in-lens display, distinct from the camera-only glasses above.",
    cost: "Developer kits and consumer units vary widely, generally expensive relative to a phone", costTier: "paid-hardware",
    learning: "Depends on the device; Spectacles inherits Lens Studio's curve",
    distribution: "Platform-locked in both cases", distTier: "platform-locked",
    offline: "No", offlineTier: "no",
    fit: "Low. Same constraint as the no-code platforms these devices are tied to.", fitTier: "low",
    usedIn: null
  }
];
