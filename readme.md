# Dawa ⚕️

## Overview

**Dawa** is a Bahrain-based platform that helps consumers find medicines available at nearby pharmacies without having to call multiple stores. Users can search for a medicine, compare pharmacies based on availability and location, and submit a reservation request. When a prescription is required, the user can securely upload it for the pharmacy to review. Pharmacies remain responsible for verifying prescriptions, confirming availability, and dispensing the medicine.

## Live Application

- **Frontend:** Deployed frontend
- **Backend API:** Deployed Backend
- **Backend Repository:** Backend Github Repository

## Screenshots

### Home Page


### Feature Page

### Other pages



## Technologies Used

- React
- Vite
- React Router
- Axios
- CSS or CSS Modules

Only include ones you used on frontend

## Features

- User registration and login
- Protected routes
- etc.


## Project Structure

If you have different structure than this then add or remove from it

```text
src/
├── assets/
├── components/
├── context/
├── pages/
├── services/
├── styles/
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

Install the following before running the project:

- node.js

The backend API has to be working. LINK TO THE BACKEND API

## Installation

### 1. Clone the repository

```bash
git clone FRONTEND_REPOSITORY_URL
cd FRONTEND_REPOSITORY_NAME
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the root directory:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

### 4. Start the development server

```bash
npm run dev
```

Go to:

```text
http://localhost:5173
```


## Application Routes

| Route                       | Page              | Access         |
| --------------------------- | ----------------- | -------------- |
| `/`                         | Home page         | Public         |
| `/register`                 | Registration page | Public         |
| `/login`                    | Login page        | Public         |
| `/products`                 | Product list      | Public         |
| `/products/:productId`      | Product details   | Public         |
| `/products/new`             | Create product    | Authenticated  |
| `/products/:productId/edit` | Edit product      | Owner or admin |
| `*`                         | Not-found page    | Public         |


## User Stories 

**As a User**

- As a user, I want to sign up and sign in so that I can access my account. 
- As a user, I want to search for a medicine by name so that I can find it easily. 
- As a user, I want to see which pharmacies have the medicine available. 
- As a user, I want to view the medicine's price and dosage. 
- As a user, I want to view pharmacy details and location. 

**As a Pharmacy**

- As a pharmacy, I want to sign up and sign in so that I can manage my medicines. 
- As a pharmacy, I want to add medicines to my inventory. 
- As a pharmacy, I want to edit medicine information. 
- As a pharmacy, I want to update medicine stock and availability. 
- As a pharmacy, I want to remove medicines from my inventory.



## Future Enhancements


## Team Members

| Name           | GitHub                              |
| -------------  | ----------------------------------- |
| Nadia Algallaf | [https://github.com/NadiaAlgallaf ] |
| Shaikha Subah  | [https://github.com/shaikhasubah17] |


## Credits