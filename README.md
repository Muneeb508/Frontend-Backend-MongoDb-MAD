# Student Attendance App

A simple React Native app for tracking student attendance with a Node.js backend.

## Features

- Add new students
- Mark attendance (Present/Absent)
- View student list
- Real-time attendance tracking

## Setup

### Backend (Node.js)

1. Install dependencies:
```bash
npm install express
```

2. Start the server:
```bash
node server.js
```

Server runs on `http://localhost:3000`

### Frontend (React Native)

1. Install dependencies:
```bash
npm install
```

2. Start the app:
```bash
npx expo start
```

## API Endpoints

- `GET /students` - Get all students
- `POST /students` - Add new student
- `POST /attendance` - Mark attendance
- `GET /attendance` - Get attendance records

## Usage

1. **Add Student**: Enter name and student ID, click "Add Student"
2. **Mark Attendance**: Click "Present" or "Absent" for each student
3. **View Status**: See attendance status below each student name

## Data Storage

- Backend uses in-memory storage (data resets on server restart)
- No database required

## Files

- `server.js` - Backend API server
- `app/(tabs)/index.tsx` - Main React Native component
- `app.js` - Alternative JavaScript version

## Requirements

- Node.js
- React Native/Expo
- Express.js
