import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = ()=>{
  return (
    <>
    <Routes>
      <Route path="/" element = {<Register />} />
      <Route path="register" element = {<Register />} />
      <Route path="login" element = {<Login />} />
    </Routes>
    </>
  )
}
export default App;