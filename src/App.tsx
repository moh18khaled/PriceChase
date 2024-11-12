import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

const App = ()=>{
  return (
    <>
    <Routes>
      <Route path="" element = {<HomePage />} />
      <Route path="register" element = {<Register />} />
      <Route path="login" element = {<Login />} />
      <Route path="categories" element = { <CategoryPage />} />
    </Routes>
    </>
  )
}
export default App;