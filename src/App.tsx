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

const App = ()=>{
  return (
    
    <UserProvider>
    <Routes>
      <Route path="/" element = {<HomePage />} />
      <Route path="/register" element = {<Register />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/categories/:id" element = { <CategoryPage />} />
      <Route path="/productPage/:id" element = {<ProductPage />} />
      <Route path="/profile-page" element = {<ProfilePage />} />
      <Route path="/admin" element = {<AdminDashboard />} >
      <Route path="users" element = {<ManageUsers />} />
      <Route path="products" element = {<ManageProducts />} />
      <Route path="fetch-products" element = {<FetchNewProducts />} />
      <Route path="product-status" element = {<UpdateProductStatus />} />
      <Route path="auto-updates" element = {<p>update-auto</p>} />
      <Route path="schedule-fetch" element = {<p>schedule-fetch</p>} />
      </Route>
    </Routes>
    </UserProvider>
    
  )
}
export default App;