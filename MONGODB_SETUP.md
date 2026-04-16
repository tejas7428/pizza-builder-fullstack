# MongoDB Setup

You can use either MongoDB Atlas (cloud) or a local MongoDB installation for development.

## Option 1: MongoDB Atlas (Recommended)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster:
   - Select "Shared" tier (free)
   - Choose a cloud provider and region
   - Keep the cluster name or customize it
4. Create a database user:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication method
   - Enter a username and password
   - Assign "Read and write to any database" permissions
5. Configure network access:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can add your current IP or allow access from anywhere (0.0.0.0/0)
6. Get your connection string:
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
7. Update the connection string with your credentials:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/pizza-builder?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB Installation

1. Download and install MongoDB Community Server:
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Download the appropriate version for your OS
   - Follow the installation instructions

2. Start MongoDB service:
   - On Windows: MongoDB service should start automatically
   - On macOS/Linux: Run `mongod` in terminal

3. Your connection string will be:
   ```
   mongodb://localhost:27017/pizza-builder
   ```

## Adding to Environment Variables

Add your MongoDB connection string to the backend `.env` file:
```
MONGO_URI=your_mongodb_connection_string
```

## Database Seeding

After setting up MongoDB, run the seed script to populate initial data:
```
cd backend
npm run seed
```

This will create:
- An admin user (admin@example.com / admin123)
- A sample user (user@example.com / user123)
- 5 pizza bases
- 5 sauces
- 5 cheeses
- 8 veggies
- 6 meats