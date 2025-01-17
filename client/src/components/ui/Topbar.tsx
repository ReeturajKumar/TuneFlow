import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import logo from "../../../public/logo.png"
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const Topbar = () => {
  const {isAdmin} = useAuthStore();
  console.log(isAdmin);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Left Section */}
      <div className="flex gap-2 items-center">
          <img src={logo} alt="TuneFlow"  className="size-8"/>
          TuneFlow
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Admin Access: Show Dashboard Link */}
        {isAdmin && (
          <Link to={"/admin-panel"} className={
            cn(
              buttonVariants({variant: "outline"}),
            )
          }>
            <LayoutDashboardIcon className="w-5 h-5 mr-2" />
            Admin Dashboard
          </Link>
        )}

        {/* Signed In State */}

        {/* Signed Out State */}
        <SignedOut>
          {/* Show Sign In Button */}
          <SignInOAuthButton />
        </SignedOut>


        <UserButton/>
      </div>
    </div>
  );
};

export default Topbar;
