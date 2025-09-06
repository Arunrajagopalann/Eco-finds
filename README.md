# EcoFinds - Sustainable Second-Hand Marketplace

A comprehensive marketplace platform for buying and selling second-hand items, promoting sustainable consumption and circular economy principles.

## 🌱 Project Overview

EcoFinds is a full-stack web application that connects buyers and sellers in a sustainable marketplace for pre-owned goods. The platform focuses on extending product lifecycles, reducing waste, and making sustainable choices accessible to everyone.

## 🏗️ Architecture

- **Frontend**: React.js with styled-components for responsive UI
- **Backend**: Node.js with Express.js RESTful API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication system

## ✨ Features

### Core Functionality
- **User Authentication**: Secure registration and login system
- **Product Management**: Create, read, update, and delete product listings
- **Search & Filter**: Advanced filtering by category, price range, and keywords
- **Shopping Cart**: Add/remove items and manage cart contents
- **User Dashboard**: Comprehensive profile management
- **Order History**: Track all previous purchases

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Intuitive Navigation**: Easy-to-use interface with clear navigation
- **Real-time Updates**: Dynamic content updates and user feedback

## 📁 Project Structure

```
ecofinde-backend/
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User data model
│   ├── Product.js           # Product data model
│   ├── Cart.js              # Shopping cart model
│   └── Order.js             # Order history model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product management routes
│   └── users.js             # User management routes
├── server.js                # Express server configuration
├── .env                     # Environment variables
└── package.json             # Dependencies and scripts

ecofinde-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.js        # Navigation component
│   │   └── LoadingSpinner.js # Loading indicator
│   ├── pages/
│   │   ├── HomePage.js      # Landing page
│   │   ├── LoginPage.js     # Authentication page
│   │   ├── ProductListPage.js # Product browsing
│   │   ├── ProductDetailPage.js # Product details
│   │   ├── AddProductPage.js # Create new listing
│   │   ├── MyListingsPage.js # Manage user's products
│   │   ├── UserDashboard.js # Profile management
│   │   ├── CartPage.js      # Shopping cart
│   │   └── OrdersPage.js    # Order history
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── context/
│   │   └── AuthContext.js   # Authentication context
│   └── App.js               # Main application component
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecofinds
   ```

2. **Backend Setup**
   ```bash
   cd ecofinde-backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../ecofinde-frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecofinds
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Database Setup**
   - Ensure MongoDB is running on your system
   - The application will automatically create the database and collections

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd ecofinde-backend
   npm run dev
   ```
   The API server will run on http://localhost:5000

2. **Start the Frontend Application**
   ```bash
   cd ecofinde-frontend
   npm start
   ```
   The React app will run on http://localhost:3000

3. **Access the Application**
   Open your browser and navigate to http://localhost:3000

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)
- `GET /api/products/user/my-listings` - Get user's products (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/cart` - Get user's cart (protected)
- `POST /api/users/cart/add` - Add item to cart (protected)
- `DELETE /api/users/cart/remove/:productId` - Remove from cart (protected)
- `GET /api/users/orders` - Get order history (protected)

## 🗂️ Database Schema

### User Model
- Username, email, password (hashed)
- Personal information (name, phone, address)
- Profile image placeholder
- Account status and timestamps

### Product Model
- Title, description, price, category
- Condition, images (placeholders)
- Seller reference, status, location
- View count and search indexing

### Cart Model
- User reference
- Items array with product references and quantities
- Total amount calculation

### Order Model
- Buyer and seller references
- Product reference and quantity
- Order status and payment status
- Shipping information and dates

## 🎨 UI Components

### Wireframe Implementation
- **Login/Sign Up**: Clean authentication interface
- **Product Feed**: Grid layout with filtering options
- **Add Product**: Comprehensive form with validation
- **My Listings**: Management interface for user's products
- **Product Detail**: Detailed view with action buttons
- **User Dashboard**: Profile editing with all user fields
- **Cart**: Shopping cart with item management
- **Order History**: Previous purchases display

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration for cross-origin requests

## 🌐 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## 📈 Future Enhancements

- Image upload functionality
- Payment integration
- Real-time messaging between users
- Product recommendations
- Advanced search with geolocation
- Mobile app development with React Native
- Push notifications
- Social features and user ratings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**EcoFinds** - Making sustainable consumption accessible to everyone! 🌱
