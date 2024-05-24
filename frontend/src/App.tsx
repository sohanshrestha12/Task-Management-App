import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OtpVerification from "./pages/OtpVerification"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="otpVerification/:id" element={<OtpVerification/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
