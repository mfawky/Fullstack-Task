# Fullstack Task

A fullstack web application with a Next.js frontend and an Express + Prisma backend for managing apartments.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project allows users to:

- View a list of apartments
- Search and filter apartments by city, price, bedrooms, bathrooms, and keywords
- View details of a specific apartment
- Create new apartment listings

The backend uses **Express** and **Prisma** with a PostgreSQL database. The frontend uses **Next.js** for server-side rendering and client-side functionality.

---

## Features

- RESTful API with full CRUD for apartments
- Filtering and search functionality
- TypeScript support for both frontend and backend
- Dockerized development environment
- Interactive API documentation with Swagger (optional)

---

## Tech Stack

**Frontend:**

- Next.js
- React
- TypeScript
- CSS
- Axios

**Backend:**

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- TypeScript

**Dev Tools:**

- Docker
- Git
- Postman (for testing APIs)

---

## Folder Structure
Fullstack-Task/
├─ backend/
│ ├─ prisma/
│ │ └─ schema.prisma
│ ├─ node_modules/
│ ├─ index.ts
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ ... other backend files
├─ frontend/
│ ├─ src/
│ ├─ public/
│ ├─ node_modules/
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ ... other frontend files
└─ README.md


---

## Getting Started

### Prerequisites
- Node.js >= 20
- npm >= 10
- Docker (optional)
- PostgreSQL

### Clone the repository
git clone https://github.com/mfawky/Fullstack-Task.git
cd Fullstack-Task


## Environment Variables
DATABASE_URL="postgresql://postgres:postgres@db:5432/postgres?schema=public"

## Running the Project
# Backend
cd backend
npm install                  # install dependencies
npx prisma generate          # generate Prisma client
npx prisma migrate dev --name init   # apply DB migrations
npm run dev                  # start backend server

# Frontend
cd frontend
npm install                  # install dependencies
npm run dev                  # start frontend server


## Docker Setup
docker compose build   # build all images (backend, frontend, db)
docker compose up -d   # start all containers in the background
