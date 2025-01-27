import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import logo from "../../../public/logo.png";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log(isAdmin);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Left Section */}
      <Link to={"/"} className="flex gap-2 items-center text-2xl font-extrabold cursor-pointer">
        <img src={logo} alt="TuneFlow" className="w-8 h-8 md:w-10 md:h-10" />
        <span className="hidden md:block">TuneFlow</span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4 sm:gap-2 md:gap-4">
        {/* Admin Access: Show Dashboard Link */}
        {isAdmin && (
          <Link
            to={"/admin-panel"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Admin Dashboard</span>
          </Link>
        )}

        {/* Signed Out State */}
        <SignedOut>
          {/* Show Sign In Button */}
          <SignInOAuthButton />
        </SignedOut>

        {/* User Button (Always visible when signed in) */}
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
