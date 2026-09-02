# Dawa ⚕️

A Bahrain-based medicine availability and reservation platform that helps users find medicines available at nearby pharmacies, compare availability, and submit reservation requests.

## Overview

**Dawa** is a full-stack web application designed to make finding medicines easier and more convenient.

Users can search for medicines and view pharmacies where the medicine is currently available. They can also check medicine details, compare availability, view pharmacy locations, and make reservations.

The platform also provides pharmacies with tools to manage their medicines, inventory, stock levels, and reservation requests.

This repository contains the **frontend application** of Dawa, built with React and Vite.

---

## Related Repositories

* **Frontend:** https://github.com/NadiaAlgallaf/Project-4-frontend
* **Backend:** https://github.com/NadiaAlgallaf/Project-4-backend

---

## Features

### 👤 User Features

Users can:

* Create an account
* Sign in and sign out
* Browse available medicines
* Search for medicines
* View medicine details
* View medicine price, dosage, and dosage form
* Check medicine availability across pharmacies
* Filter pharmacy availability by location
* View pharmacy information and locations
* See stock quantities
* See **Low Stock** status when stock is below 5 units
* Make medicine reservations
* Upload prescriptions when required
* View their reservations
* Manage their reservations

### 🏥 Pharmacy Features

Pharmacy accounts can:

* Sign up and sign in
* Access a pharmacy dashboard
* Manage pharmacy information
* Manage medicine inventory
* Add medicines to inventory
* Update stock quantities
* Remove medicines from inventory
* View low-stock medicines
* View reservation requests
* Manage reservation statuses
* Review uploaded prescriptions

### 🌐 Internationalization

Dawa supports both:

* 🇬🇧 English
* 🇧🇭 Arabic

The application includes:

* Language switching
* Arabic translations
* Automatic RTL layout for Arabic
* LTR layout for English
* Language persistence using local storage

### 📍 Pharmacy Locations

The application uses **Leaflet** to display pharmacy locations and provide users with a visual way to explore pharmacies.

### 🔐 Authentication

The frontend includes:

* User authentication
* Pharmacy authentication
* Protected routes
* Role-based navigation
* Authentication state management
* Secure communication with the backend API

---

## Tech Stack

### Frontend

* **React** — UI library
* **Vite** — Frontend build tool
* **React Router** — Client-side routing
* **Axios** — HTTP requests
* **CSS / CSS Modules** — Styling
* **i18next** — Internationalization
* **react-i18next** — React internationalization integration
* **i18next-browser-languagedetector** — Language detection and persistence
* **Leaflet** — Interactive maps

### Backend

The frontend communicates with the Dawa REST API built with:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT authentication

See the backend repository for the API implementation.

---

## Project Structure

```text
Project-4-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── i18n/
│   │   ├── i18n.js
│   │   └── languages.js
│   │
│   ├── locales/
│   │   ├── en/
│   │   │   └── common.json
│   │   └── ar/
│   │       └── common.json
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── MedicinesPage.jsx
│   │   ├── MedicineDetails.jsx
│   │   ├── PharmaciesPage.jsx
│   │   ├── SignInPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── MyReservationsPage.jsx
│   │   └── ...
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── medicineService.js
│   │   ├── inventoryService.js
│   │   ├── reservationService.js
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

### Folder Responsibilities

| Folder/File   | Responsibility                                  |
| ------------- | ----------------------------------------------- |
| `components/` | Reusable UI components                          |
| `context/`    | Global application state such as authentication |
| `i18n/`       | Internationalization configuration              |
| `locales/`    | English and Arabic translations                 |
| `pages/`      | Application pages and views                     |
| `services/`   | API communication using Axios                   |
| `assets/`     | Images, logos, and other static assets          |
| `App.jsx`     | Main application routing and structure          |
| `main.jsx`    | React application entry point                   |
| `index.css`   | Global styling                                  |

---

## Main Application Pages

### Public Pages

* Home
* Medicines
* Medicine Details
* Pharmacies
* Sign Up
* Sign In

### User Pages

* My Reservations

### Pharmacy Pages

* Pharmacy Dashboard
* Inventory Management
* Pharmacy Reservations

---

## Medicine Availability

When a user opens a medicine, the application retrieves its availability from the backend.

For each pharmacy, users can see information such as:

* Pharmacy name
* Stock quantity
* Stock status
* Location
* Medicine price

Medicines with no available stock are excluded from the available pharmacy results.

### Low Stock

When the stock quantity is below **5 units**, the application displays:

**Low Stock**

This allows users to identify medicines that may have limited availability before making a reservation.

---

## Reservation Flow

The reservation process follows these general steps:

```text
Search Medicine
      ↓
View Medicine Details
      ↓
Check Pharmacy Availability
      ↓
Select Pharmacy & Quantity
      ↓
Create Reservation
      ↓
Upload Prescription if Required
      ↓
Pharmacy Reviews Request
      ↓
Reservation Status Updated
```

---

## Authentication & Authorization

The application supports two main roles:

### User

Users can:

* Search for medicines
* View pharmacies
* Make reservations
* Upload prescriptions
* View their reservations

### Pharmacy

Pharmacies can:

* Manage their inventory
* Manage stock
* Manage reservation requests
* Access pharmacy-specific pages and features

The frontend uses authentication context and protected routes to control access to role-specific functionality.

---

## Internationalization

Dawa supports English and Arabic using **i18next**.

The language selector allows users to switch between:

**English**

and

**العربية**

When Arabic is selected, the application automatically changes the document direction to:

```text
RTL
```

When English is selected:

```text
LTR
```

The selected language is stored locally so that the user's language preference can persist between sessions.

---

## API Communication

The frontend communicates with the backend using **Axios**.

API operations are organized into service modules, including:

* Authentication services
* Medicine services
* Pharmacy services
* Inventory services
* Reservation services

This keeps API communication separate from the UI components and makes the application easier to maintain.

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_BACKEND_SERVER_URL=http://localhost:3000
```

### Environment Variable

| Variable                  | Description                 |
| ------------------------- | --------------------------- |
| `VITE_BACKEND_SERVER_URL` | URL of the Dawa backend API |

For production, replace the local backend URL with the deployed backend API URL.

**Do not commit sensitive environment variables or secrets to GitHub.**

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

You will also need the Dawa backend running locally or access to the deployed backend API.

### 1. Clone the repository

```bash
git clone https://github.com/NadiaAlgallaf/Project-4-frontend.git
```

### 2. Navigate to the project

```bash
cd Project-4-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the environment file

Create a `.env` file:

```env
VITE_BACKEND_SERVER_URL=http://localhost:3000
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

## Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the Vite development server    |
| `npm run build`   | Builds the application for production |
| `npm run preview` | Previews the production build         |
| `npm run lint`    | Runs ESLint                           |

---

## Build for Production

To create a production build:

```bash
npm run build
```

The optimized production files will be generated in the `dist/` directory.

---

## Application Flow

The main user journey is:

```text
Home
  ↓
Search Medicines
  ↓
Select Medicine
  ↓
View Availability
  ↓
Select Pharmacy
  ↓
Make Reservation
  ↓
Upload Prescription if Required
  ↓
Track Reservation
```

The pharmacy workflow is:

```text
Pharmacy Sign In
       ↓
Dashboard
       ↓
Manage Inventory
       ↓
Update Stock
       ↓
View Reservations
       ↓
Review Requests
       ↓
Update Reservation Status
```

---

## Design Goals

The Dawa frontend was designed with the following goals:

* Simple and intuitive navigation
* Clear medicine availability information
* Easy reservation process
* Role-specific user experiences
* Responsive interface
* Arabic and English support
* Accessible stock information
* Separation between UI and API logic

---

## Project Purpose

Dawa was developed as a full-stack software engineering project to address a practical problem in the local pharmacy experience.

The frontend demonstrates:

* React component development
* Client-side routing
* State management
* REST API integration
* Authentication
* Role-based access control
* CRUD operations
* Internationalization
* RTL/LTR support
* File upload workflows
* Map integration
* Responsive UI development

---

## Team

### Dawa Development Team

* **Nadia Algallaf**
* **Shaikha Subah**

---

## License

This project was developed as part of a software engineering bootcamp project.
