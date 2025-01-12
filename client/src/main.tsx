import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AuthProviderComponent from "./provider/authProvider.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Ensure dark mode is applied immediately
if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#fff";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProviderComponent>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProviderComponent>
    </ClerkProvider>
  </StrictMode>
);
