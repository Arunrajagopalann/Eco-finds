# EcoFinds Marketplace Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/MadheshN-eng/oodo.git
cd oodo
```

### 2. Backend Setup
```bash
# Navigate to backend
cd ecofinde-backend

# Install dependencies
npm install

# Create environment file
echo "MONGODB_URI=mongodb://localhost:27017/ecofinde" > .env
echo "JWT_SECRET=your-super-secret-jwt-key-change-this" >> .env
echo "PORT=5000" >> .env

# Start backend (in one terminal)
npm run dev
```

### 3. Frontend Setup
```bash
# Open NEW terminal and navigate to frontend
cd ecofinde-frontend

# Install dependencies
npm install

# Start frontend
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Database Setup Options

### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/ecofinde`

### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://cloud.mongodb.com
2. Create a cluster
3. Get connection string and update `.env` file
4. Replace `MONGODB_URI` with your Atlas connection string

## Project Structure
```
oodo/
├── ecofinde-backend/          # Node.js/Express API
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth & upload middleware
│   └── uploads/              # Uploaded images
└── ecofinde-frontend/         # React.js frontend
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/           # Page components
    │   ├── context/         # Auth context
    │   └── services/        # API services
    └── public/
```

## Features Available
- ✅ User Registration & Login
- ✅ Product Listing & Management
- ✅ Image Upload & Management
- ✅ Shopping Cart
- ✅ User Dashboard
- ✅ Order History
- ✅ Search & Filter Products
- ✅ Responsive Design

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - For Atlas: whitelist your IP address

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on ports 3000/5000

3. **npm install fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and run `npm install` again

4. **Images not displaying**
   - Ensure backend is running on correct port
   - Check uploads folder permissions

## Development Commands

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start normally
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Create production build
```

## Contributing
1. Create a new branch for features
2. Make changes
3. Test thoroughly
4. Push and create pull request

## Support
If you encounter issues:
1. Check this README
2. Verify all prerequisites are installed
3. Check terminal for error messages
4. Ensure both backend and frontend are running
