# Habiter - Habit Tracker

ICT 930 Advanced Web Application Development: Assignment 2

## Project Overview

Habiter is a daily habit tracking web application built with React and Vite. It allows users to create, manage, and monitor personal habits across different life categories such as health, fitness, mindset, and learning. The app is designed to be simple to use while meeting all the technical requirements set out in the assessment brief. Users can view a daily dashboard, manage their full habit list with filters and search, check off habits for the day, and add or edit habits through a validated form. All data is stored in the browser using localStorage, so habits persist between sessions without needing a backend.

## Technology Stack

- React 19: UI library using functional components and hooks
- Vite: fast build tool and local development server
- React Router v7: client-side routing between pages
- Context API: global state management for habit data
- CSS Modules: scoped component-level styling
- localStorage: browser-based data persistence

## Installation Instructions

Make sure you have **Node.js version 16 or higher** installed before starting.

**Step 1 — Clone or extract the project**

If you received a ZIP file, extract it to a folder of your choice. If you have the GitHub link, run:

```bash
git clone <[repository-url](https://github.com/ranjanacharya7890-cloud/Health-Habit-Tracker.git)>
```

**Step 2 — Install dependencies**

```bash
cd habitly
npm install
```

**Step 3 — Run the development server**

```bash
npm run dev
```

Then open your browser and go to: `http://localhost:5173`

**Step 4 — Build for production (which is optional)**

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Navbar.module.css
│   ├── HabitCard.tsx
│   ├── HabitCard.module.css
│   ├── FilterBar.tsx
│   ├── FilterBar.module.css
│   ├── Toast.tsx
│   └── Toast.module.css
├── context/
│   └── HabitContext.tsx
├── data/
│   └── habits.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Dashboard.module.css
│   ├── HabitsList.tsx
│   ├── HabitsList.module.css
│   ├── Today.tsx
│   ├── Today.module.css
│   ├── HabitForm.tsx
│   └── HabitForm.module.css
├── App.tsx
├── main.tsx
└── index.css
```

## Key Features

- Dashboard with four summary cards: total habits, completed today, best streak, and active categories
- Live progress bar showing how many of today's habits have been completed
- All Habits page with real-time search and three filter options: All, Done, and Pending
- Today's Checklist: a focused view showing only habits scheduled for the current day
- Add Habit form with full validation: required fields, category selection, and day-of-week picker
- Edit Habit: same form pre-filled with existing habit data, accessible from each habit card
- Delete Habit: removes a habit with a confirmation prompt
- Toggle habits done or pending with streak tracking — streak increases on completion and decreases when unmarked
- Toast notifications: slide-up feedback after every user action
- LocalStorage persistence: habits are saved in the browser and survive page refreshes
- Responsive layout: works on mobile and desktop
- Loading state on the form page: simulates async data fetching
- Error state on the edit page: handles cases where a habit ID is not found

## Design Decisions

- A warm with light colour scheme was chosen to give the app a clean and welcoming feel that suits a daily productivity tool. The background uses a soft cream tone (#faf7f2) with white cards and subtle shadows to create depth without heaviness. The primary accent colour is sage green (#5a7a5e), used for active states, buttons, and the progress bar. Coral (#e07a5f) is used for streak indicators and error feedback, while warm gold (#c8943a) highlights learning category badges.

- CSS Modules were used instead of a CSS framework so that styles are scoped to each component, preventing naming conflicts as the project grows. This also makes the codebase easier to maintain.

- Context API was chosen over a third-party library like Redux or Zustand because the app's state is simple enough that a built-in solution avoids adding unnecessary dependencies. The context also exposes derived functions like getTodaysHabits() and getFilteredHabits() so pages do not need to calculate these themselves.

- Fraunces is used for headings to create visual hierarchy and a distinctive editorial feel, while DM Sans is used for body text and UI elements. The combination gives the app a refined, human look without relying on generic system fonts.
