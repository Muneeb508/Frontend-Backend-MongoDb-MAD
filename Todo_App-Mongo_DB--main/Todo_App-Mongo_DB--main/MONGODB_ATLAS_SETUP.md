# MongoDB Atlas Setup Instructions

Follow these steps to set up MongoDB Atlas for your Student Attendance App:

## 1. Create MongoDB Atlas Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email address

## 2. Create a New Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (perfect for development)
3. Select a cloud provider and region (choose one closest to you)
4. Give your cluster a name (e.g., `Cluster0`)
5. Click **"Create Cluster"** (this may take 3-5 minutes)

## 3. Create a Database User

1. On the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter a username (e.g., `todoapp_user`)
5. Click **"Autogenerate Secure Password"** or create your own strong password
6. **IMPORTANT**: Copy and save this password somewhere safe!
7. Under "Database User Privileges", select **"Read and write to any database"**
8. Click **"Add User"**

## 4. Whitelist Your IP Address

1. On the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - For production, add only your specific IP addresses
4. Click **"Confirm"**

## 5. Get Your Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose **"Node.js"** as the driver
5. Copy the connection string (it looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## 6. Configure Your Application

1. In your project root directory, create a file named `.env`
2. Add the following content to `.env`:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/todo_app_db?retryWrites=true&w=majority
   PORT=3000
   ```

3. **Replace the placeholders:**
   - `your_username` → the database username you created in Step 3
   - `your_password` → the password from Step 3
   - `cluster0.xxxxx.mongodb.net` → your actual cluster URL from Step 5
   - `todo_app_db` → this is your database name (you can change it)

### Example `.env` file:
```env
MONGO_URI=mongodb+srv://todoapp_user:MySecurePass123@cluster0.abc123.mongodb.net/todo_app_db?retryWrites=true&w=majority
PORT=3000
```

## 7. Test the Connection

1. Start your backend server:
   ```bash
   npm run server
   ```

2. You should see:
   ```
   ✅ Connected to MongoDB
   🚀 Server running on port 3000
   ```

3. If you see an error, double-check:
   - Username and password are correct (no extra spaces)
   - IP address is whitelisted
   - Connection string format is correct

## 8. View Your Data (Optional)

1. In MongoDB Atlas, go to **"Database"**
2. Click **"Browse Collections"** on your cluster
3. Once you create todos in your app, you'll see the `todo_app_db` database appear here
4. You can view, edit, and delete data directly from this interface

## Important Security Notes

⚠️ **NEVER commit your `.env` file to Git!**
- The `.env` file is already in `.gitignore`
- Never share your MongoDB password publicly
- For production, use environment variables in your hosting platform

## Troubleshooting

### "Authentication failed" error
- Verify username and password in your connection string
- Make sure you're using the database user password, not your Atlas account password

### "Connection timeout" error
- Check that your IP address is whitelisted
- Try "Allow Access from Anywhere" for testing

### "Database not found" error
- This is normal! MongoDB creates the database automatically when you insert the first document
- Just create a todo in your app, and the database will appear

## Next Steps

Once connected to MongoDB Atlas:
1. Start the backend: `npm run server`
2. Start the frontend: `npm start`
3. Create your first todo!

Your data will now be stored in the cloud and accessible from anywhere! 🎉

