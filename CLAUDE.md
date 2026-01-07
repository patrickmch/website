# McHeyser Site - Project Instructions

## Project Overview
Personal consulting website for Patrick McHeyser's Fractional Community Operations business. Built with React 19 + TypeScript + Vite, using Tailwind CSS (via CDN) and Google Gemini AI for chatbot/insights features.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build**: Vite 6
- **Routing**: React Router v7 (HashRouter for static hosting compatibility)
- **Styling**: Tailwind CSS via CDN + Plus Jakarta Sans / Inter fonts
- **Icons**: Lucide React
- **AI**: Google Gemini (`@google/genai`) for chatbot and ritual generator

## Project Structure
```
├── App.tsx              # Main router with 4 routes
├── index.tsx            # React entry point
├── index.html           # HTML template with Tailwind CDN + importmaps
├── constants.tsx        # Nav items, trust signals
├── types.ts             # TypeScript interfaces
├── components/
│   ├── Layout.tsx       # Navbar, footer, chatbot wrapper
│   └── Chatbot.tsx      # AI chatbot widget (bottom-right)
├── pages/
│   ├── Home.tsx         # Landing page with hero, problems, CTA
│   ├── About.tsx        # Patrick's story, philosophy
│   ├── HowIWork.tsx     # 3-phase process, pricing, AI ritual generator
│   └── WorkWithMe.tsx   # Application form
└── services/
    └── geminiService.ts # Gemini AI chat + search integration
```

## Commands
```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment Variables
- `GEMINI_API_KEY` - Required for chatbot and AI features. Set in `.env.local`.

## Key Patterns
- Uses `HashRouter` (not `BrowserRouter`) for static hosting compatibility
- Tailwind loaded via CDN in index.html - no local Tailwind config
- AI features gracefully degrade if API key missing
- Form on WorkWithMe page logs to console (frontend-only, no backend)

## Design System
- **Primary**: Emerald (700/800 for actions)
- **Accent**: Amber (for highlights, status)
- **Neutral**: Slate/Stone
- **Border radius**: Large rounded corners (3rem, 2.5rem)
- **Font**: Plus Jakarta Sans (headings), Inter (body)

## Notes
- Images reference local files: `patrick-headshot.jpg`, `patrick-climbing.jpg`, `patrick-mountain.jpg`
- One placeholder image uses picsum.photos (About page)
