import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";

const Topbar = () => {
  const isAdmin = false; // Adjust this dynamically based on your logic (e.g., from user roles or context)

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Left Section */}
      <div className="flex gap-2 items-center">
        <span className="text-white font-semibold text-xl">TuneFlow</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Admin Access: Show Dashboard Link */}
        {isAdmin && (
          <Link to="/dashboard" className="flex items-center text-white">
            <LayoutDashboardIcon className="w-5 h-5 mr-2" />
            <span>Dashboard</span>
          </Link>
        )}

        {/* Signed In State */}
        <SignedIn>
          {/* Show Sign Out Button */}
          <SignOutButton>
            <button className="text-white border border-zinc-200 px-4 py-2 rounded hover:bg-zinc-800 transition">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        {/* Signed Out State */}
        <SignedOut>
          {/* Show Sign In Button */}
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
