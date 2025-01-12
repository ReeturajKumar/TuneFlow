import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import AuthCallBackPage from './pages/Auth/AuthCallBackPage';
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback   
      signUpForceRedirectUrl={"/auth-callback"}
      />} />
      <Route path="/auth-callback" element={<AuthCallBackPage/>} />
    </Routes>
    </>
  )
}

export default App
