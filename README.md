# 100 Web Projects (React + Vite)

A curated collection of **100 small-to-medium web projects** built with React, Vite, and TailwindCSS. The landing page showcases all projects in a responsive grid, each linking to its own interactive demo page.

## ✨ Features

- **Landing page with 100 projects**
- **Responsive grid**
  - 4 cards per row on desktop
  - 2 cards per row on mobile
- **Search bar** to filter projects by title/description
- **Pagination** controls at the top and bottom
- **Per-project pages** implemented as React components
- **Client-side state & `localStorage`** for forms, games, dashboards, etc.
- **React Router** for clean URLs like `/projects/weather-dashboard`
- **Footer branding**: Made by **Skycode** with social links

## 🛠 Tech Stack

- **React** (via Vite React template)
- **Vite** for dev server & build
- **TailwindCSS v3** for styling
- **React Router DOM** for routing
- **LocalStorage** for simple persistence (no backend)

## 🚀 Getting Started

### Prerequisites

- Node.js (recommended **v18+**)
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Then open the printed local URL (for example `http://localhost:5174`).

### Build for production

```bash
npm run build
```

The production assets will be generated in the `dist/` folder.

## 📁 Project Structure (high level)

- `src/App.jsx` – main app, routes, landing page, search & footer
- `src/data/projects.js` – metadata for all 100 projects (id, title, path, etc.)
- `src/projects/` – individual React components for each project
- `src/components/` – shared UI components (project card, pagination, etc.)
- `src/assets/` – images, including the Skycode logo

## 📝 Notes

- Tailwind is configured for **v3**, and some editors may warn about `@tailwind` in `index.css`; these warnings are harmless.
- Some demo components (e.g. calculator/compiler-style projects) are simplified for learning and local demos only.

## 👤 Author / Credits

**Made by Skycode**

- GitHub: https://github.com/airdrophunterph/100_web_projects
- Facebook: https://www.facebook.com/profile.php?id=61573899091725
- TikTok: https://www.tiktok.com/@skycodesoftware
- Instagram: https://www.instagram.com/skycode_devs/

Feel free to fork the repo, explore the individual projects, and adapt them for your own learning or portfolio.
