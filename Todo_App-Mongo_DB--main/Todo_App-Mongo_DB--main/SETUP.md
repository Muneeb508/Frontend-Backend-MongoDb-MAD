# Student Attendance App Setup Guide

## MongoDB Atlas Configuration

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account (if you don't have one)
3. Create a new cluster (Free tier M0 is sufficient)

### Step 2: Get Your Connection String
1. In your MongoDB Atlas dashboard, click **"Connect"** on your cluster
2. Select **"Connect your application"**
3. Copy the connection string (it will look like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 3: Configure Environment Variables
1. Create a `.env` file in the root directory of your project
2. Add the following content to the `.env` file:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/todo_app_db?retryWrites=true&w=majority
   PORT=3000
   ```
3. Replace `<username>`, `<password>`, and `<cluster-url>` with your actual MongoDB Atlas credentials

**Example:**
```env
MONGO_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/todo_app_db?retryWrites=true&w=majority
PORT=3000
```

### Step 4: Whitelist Your IP Address
1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Either add your current IP or select **"Allow Access from Anywhere"** (0.0.0.0/0) for development

### Step 5: Create a Database User
1. In MongoDB Atlas, go to **Database Access**
2. Click **"Add New Database User"**
3. Create a username and password (use these in your connection string)
4. Give the user **"Read and write to any database"** privileges

## Running the Application

### Start the Backend Server
```bash
npm run server
```
The server will run on http://localhost:3000

### Start the React Native App
In a separate terminal:
```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for Web

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

## Frontend Features

- ✅ View all todos with pending/completed counts
- ✅ Create new todos with title, description, and priority
- ✅ Edit existing todos
- ✅ Toggle completion status
- ✅ Delete todos
- ✅ Pull to refresh
- ✅ Priority levels (Low, Medium, High)
- ✅ Beautiful, modern UI

## Troubleshooting

### Backend Connection Issues
- Make sure your `.env` file exists and has the correct MongoDB URI
- Verify your IP address is whitelisted in MongoDB Atlas
- Check that the database user credentials are correct

### Frontend Connection Issues
- Make sure the backend server is running
- For Android emulator, use `http://10.0.2.2:3000/api` instead of `http://localhost:3000/api`
- For iOS simulator, `localhost` should work fine
- For physical devices, use your computer's IP address (e.g., `http://192.168.1.100:3000/api`)

### Updating API URL for Physical Device
Edit `app/services/api.ts` and change:
```typescript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000/api';
```

## Project Structure

```
studentAttendaceApp/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main todo screen
│   │   └── _layout.tsx        # Tab layout
│   ├── components/
│   │   ├── TodoForm.tsx       # Todo create/edit form
│   │   └── TodoItem.tsx       # Individual todo item
│   └── services/
│       └── api.ts             # API service layer
├── server.js                  # Express + MongoDB backend
├── package.json
└── .env                       # Environment variables (create this)
```

## Dependencies

All required dependencies are already in `package.json`:
- **Backend**: Express, Mongoose, CORS, dotenv
- **Frontend**: React Native, Expo, React Navigation

Enjoy building your Todo app! 🚀

