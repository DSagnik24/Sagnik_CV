# Sagnik Dutta Portfolio

A premium developer portfolio website for Sagnik Dutta, built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

This project is designed as a high-end personal brand site that demonstrates engineering capability rather than presenting a traditional resume. It includes a dark-first premium interface, animated technology orbit, project highlights, problem-solving section, GitHub activity panel, and downloadable resume.

## Highlights

- Responsive portfolio layout for desktop, tablet, and mobile
- Premium dark theme with light mode support
- Animated Stack Orbit visualization for technologies
- Project cards and detailed modals
- Problem-solving / code playground section
- GitHub repo activity panel
- Resume download and contact links
- Theme toggling with local persistence

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Getting Started

### Install dependencies

npm install

### Run locally

npm run dev

The app is typically served at:

- http://localhost:5173/

### Production build

npm run build

### Preview production build

npm run preview

## Project Structure

- src/App.tsx — portfolio page and main sections
- src/data/profile.ts — personal, project, and resume data
- src/context/ThemeContext.tsx — theme handling
- src/styles.css — global styling and responsive behavior
- public/ — static assets and resume PDF

## Notes

- The resume PDF in the public folder is treated as the source of truth for personal and project information.
- The portfolio is intentionally data-driven so content can be updated in one place.
- This is a portfolio app, not a backend service or API server.

## License

This project is for personal portfolio use.
