import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import { UserProvider } from "./context/context";
import ProfilePage from "./Pages/ProfilePage";

const App = ()=>{
  return (
    
    <UserProvider>
    <Routes>
      <Route path="/" element = {<HomePage />} />
      <Route path="/register" element = {<Register />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/categories" element = { <CategoryPage />} />
      <Route path="/productPage/:id" element = {<ProductPage />} />
      <Route path="profile-page" element = {<ProfilePage />} />
    </Routes>
    </UserProvider>
    
  )
}
export default App;