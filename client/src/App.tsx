import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AuthCallBackPage from "./pages/Auth/AuthCallBackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/Admin/AdminPage";
import { Toaster } from 'react-hot-toast';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
        }
      />
      <Route path="/auth-callback" element={<AuthCallBackPage />} />
      <Route path='/admin-panel' element={<AdminPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/albums/:albumId" element={<AlbumPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
