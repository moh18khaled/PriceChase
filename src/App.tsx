import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import { UserProvider } from "./context/context";
import ProfilePage from "./Pages/ProfilePage";
import AdminDashboard from "./admin";
import FetchNewProducts from "./admin/FetchNewProducts";
import UpdateProductStatus from "./admin/UpdateProductStatus";
import ManageProducts from "./admin/ManageProducts";
import ManageUsers from "./admin/ManageUsers";
import SplashScreen from "./Pages/SplachScreen";
import ScrollToTop from "./Pages/ScrollToTop";
import UpdateProfilePage from "./Pages/ProfilePage/UpdateProfilePage";
import VerifyAccount from "./validation/VerifyAccount";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <UserProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element = {<VerifyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/productPage/:id" element={<ProductPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/update-profile-page" element={<UpdateProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="fetch-products" element={<FetchNewProducts />} />
          <Route path="product-status" element={<UpdateProductStatus />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
