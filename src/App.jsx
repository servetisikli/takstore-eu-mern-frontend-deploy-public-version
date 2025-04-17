import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Shop from "./pages/Shop";
import ProductDetail from "./components/product/ProductDetail";
import ProductListByCategory from "./components/product/ProductListByCategory";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ScrollToTop from "./components/common/ScrollToTop";
import EmailVerified from "./components/common/EmailVerified";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/Resetpassword";
import PaymentPage from "./pages/PaymentPage";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="shop" element={<Shop />} />

          <Route path="product/:name" element={<ProductDetail />} />
          <Route
            path="/category/:category"
            element={<ProductListByCategory />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment/:orderId" element={<PaymentPage />} />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmation />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
