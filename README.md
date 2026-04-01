# Clinic UI

A React frontend for the Clinic Appointment System, allowing patients to view doctors,
book appointments, and manage their bookings.

**Live Demo:** https://kaatbailey.github.io/clinic-ui

**NOTE:  Live Demo is on a free tier host and takes about a minute to spin up 

## Tech Stack

- **React 19** — component-based UI
- **Vite** — fast build tooling and dev server
- **React Router DOM** — client-side routing
- **Tailwind CSS** — utility-first styling
- **JavaScript (ES6+)**

## Features

- View all doctors and their availability
- View all patients
- Book appointments with availability validation
- Cancel existing appointments
- Error handling that surfaces business rule violations from the API

## Architecture

The app follows a simple pages + components structure:
```
src/
├── api/
│   └── clinicApi.js        # All API calls to the backend
├── components/
│   └── NavBar.jsx           # Navigation
├── pages/
│   ├── DoctorsPage.jsx
│   ├── PatientsPage.jsx
│   ├── AppointmentsPage.jsx
│   └── BookAppointmentPage.jsx
├── App.jsx                  # Routes
└── main.jsx
```

All backend communication is centralized in `clinicApi.js`. Pages fetch data
on mount using `useEffect` and manage local state with `useState`.

## Backend

This frontend connects to a Spring Boot REST API:
**https://com-clinic.onrender.com**

See the [backend repository](https://github.com/kaatbailey/com.clinic) for API documentation.

## Running Locally
```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Deployment

Deployed to GitHub Pages via the `gh-pages` package:
```bash
npm run deploy
```