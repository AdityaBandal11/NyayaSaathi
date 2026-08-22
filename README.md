# NyayaSaathi AI

**Understand Your Rights. Take the Right Action.**

A frontend-only hackathon prototype for an AI-powered civic and legal empowerment platform for Indian citizens. Built with React, Vite and React Router. All AI responses, schemes, and document analysis are simulated with mock data — there is no real backend, authentication, or legal service.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/   Reusable UI building blocks
├── pages/        Route-level pages (landing + in-app screens)
├── data/         Mock scheme, application and AI-response data
├── hooks/        Small shared hooks
├── App.jsx       Routes + app shell layout
├── main.jsx      React entry point
└── index.css     Design tokens + global styles
```

## Demo flow

1. Landing page → **Ask NyayaSaathi**
2. Ask: *"My landlord is refusing to return my deposit."*
3. Watch the typing animation → action plan → required documents → sources
4. Visit **Government Schemes**, search "farmer"
5. Visit **RTI Assistant**, complete the 4-step wizard, download the draft

## Disclaimer

NyayaSaathi AI provides general informational guidance and is not a substitute for professional legal advice. This is a prototype built for hackathon demonstration only.
