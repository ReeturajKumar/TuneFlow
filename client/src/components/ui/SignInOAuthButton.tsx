import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./button";
import { useState } from "react";

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isLoaded) {
    return null; // You can optionally return a spinner or loading placeholder here
  }

  const signInWithGoogle = async () => {
    try {
      setIsSigningIn(true); // Set loading state
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback",
      });
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      // Optional: Show a user-friendly error message
    } finally {
      setIsSigningIn(false); // Reset loading state
    }
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="w-full text-white border-zinc-200 h-11"
      disabled={isSigningIn} // Disable button while signing in
      aria-label="Sign in with Google"
    >
      {isSigningIn ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};

export default SignInOAuthButton;
