# TakStore.eu MERN Frontend (Public Version)

## 📋 Project Overview

This is the frontend application for TakStore.eu, an e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). The frontend provides a modern shopping experience with product browsing, cart management, secure checkout, and user account features.

- [TakStore.eu Website](https://takstore.eu)

## 🚀 Features

- **User Authentication**
  - User registration with email verification
  - Login/logout functionality
  - Password reset capabilities
  - User profile management
  
- **Product Management**
  - Browse products by categories
  - Search functionality with filters
  - Detailed product views with images and specifications
  - Related products recommendations
  
- **Shopping Experience**
  - Intuitive shopping cart
  - Wishlist functionality
  - Order history tracking
  - Seamless checkout process
  
- **Payment Integration**
  - Secure payment processing with Stripe
  - Multiple payment method support
  - Order confirmation and receipts
  
- **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility
  - Optimized user experience across devices

## 🛠️ Technologies Used

- **React**: Frontend UI library
- **Vite**: Next-generation frontend tooling
- **React Router Dom**: Navigation and routing
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animations library
- **Axios**: HTTP client for API requests
- **React Toastify**: Toast notifications
- **Stripe.js**: Payment processing integration
- **Slugify**: URL-friendly string conversion

## 📦 Dependencies

```json
{
  "dependencies": {
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.6.0",
    "@tailwindcss/vite": "^4.0.3",
    "axios": "^1.7.9",
    "framer-motion": "^12.4.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.5",
    "react-toastify": "^11.0.3",
    "slugify": "^1.6.6",
    "tailwindcss": "^4.0.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "vite": "^6.0.5"
  }
}
```

## 🗂️ Project Structure

```
takstore-eu-mern-frontend-deploy-public-version/
├── public/                # Static files
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable React components
│   │   ├── auth/          # Authentication components
│   │   ├── common/        # Common UI components
│   │   ├── layout/        # Layout components
│   │   └── product/       # Product-related components
│   ├── context/           # React context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── CheckoutContext.jsx
│   │   ├── ProductContext.jsx
│   │   └── layout/
│   │       └── NavbarContext.jsx
│   ├── layouts/           # Page layout components
│   │   └── MainLayout.jsx
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Logout.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── SearchResults.jsx
│   │   └── Shop.jsx
│   ├── services/          # API service functions
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .eslintrc.json         # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project metadata and dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## 🔧 Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/servetisikli/takstore-eu-mern-frontend-deploy-public-version.git
cd takstore-eu-mern-frontend-deploy-public-version
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server
```bash
npm run dev
```

5. For production build
```bash
npm run build
npm run preview
```

## 🔐 Authentication Flow

1. User registers with email and password
2. Email verification is sent to confirm account
3. User logs in with credentials
4. JWT token is stored for session management
5. Protected routes require authenticated access

## 📱 Application Routes

### Public Routes
- `/` - Homepage with featured products
- `/register` - User registration
- `/login` - User login
- `/forgot-password` - Password reset request
- `/reset-password/:token` - Password reset page
- `/shop` - Product browsing page
- `/product/:name` - Product detail page
- `/category/:category` - Category browsing page
- `/search` - Search results page
- `/about` - About page

### Protected Routes
- `/profile` - User profile management
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/payment/:orderId` - Payment processing
- `/order-confirmation/:orderId` - Order confirmation

## 🛒 Shopping Flow

1. User browses products by category or search
2. User adds products to cart
3. User proceeds to checkout and enters shipping details
4. User completes payment via Stripe integration
5. Order confirmation is displayed and email sent

## 👨‍💻 Author

- **Servet Isikli** - [GitHub Profile](https://github.com/servetisikli)

## 📅 Last Updated

- Date: 2025-04-17
- By: servetisikli

## 🔗 Links

- [TakStore.eu Website](https://takstore.eu)
- [Repository](https://github.com/servetisikli/takstore-eu-mern-frontend-deploy-public-version)
