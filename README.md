# Event Management Application

## Overview

This project is a full-stack application designed to manage and display events. It includes a backend API developed with TypeScript and Node.js for CRUD operations on event data and a React frontend for interacting with the API. The application supports adding events, listing events with options to filter, sort, and search, as well as viewing event details with ticket information.

## Challenges

- **Full Stack Integration:** Ensuring seamless communication between the frontend and backend services.
- **Dockerization:** Containerizing both frontend and backend.
- **Event Sorting:** Implementing intuitive sorting capabilities on the event list.
- **Testing:** Writing comprehensive tests for backend to ensure reliability and functionality.
- **Error Handling:** Implementing robust error handling on both the client and server sides to gracefully manage unexpected scenarios.

## Running Locally

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js (for running without Docker).

### Setup Instructions

#### Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

#### Using Docker (Recommended)

1. Navigate to the project root directory.
2. Run the following command to build and start the containers:

```bash
docker-compose up --build
```

- This command starts the backend API and frontend services.

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/events

#### Running Locally Without Docker

##### Backend

1. Navigate to the `/api` directory.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

##### Frontend

1. Navigate to the `/events` directory.
2. Install dependencies:

```bash
npm install
```

3. Start the React application:

```bash
npm run dev
```

- The application will be available at http://localhost:3000.

## Testing

### Backend Tests

Navigate to the `/api` directory and run:

```bash
npm run test
```

## Features

- Add, view, edit, and delete events.
- List events with search and sort (by date and name).
- View event details including tickets info.
