import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";

const App = ()=>{
  return (
    <>
    <Routes>
      <Route path="" element = {<HomePage />} />
      <Route path="register" element = {<Register />} />
      <Route path="login" element = {<Login />} />
    </Routes>
    </>
  )
}
export default App;