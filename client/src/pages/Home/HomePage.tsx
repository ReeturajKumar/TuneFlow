import Topbar from "@/components/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion"; // For smooth animations

// Function to determine the time-based greeting
const getGreetingWithIcon = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { greeting: "Good Morning", icon: "☀️" }; // Sun icon
  if (hour >= 12 && hour < 17) return { greeting: "Good Afternoon", icon: "🌤️" }; // Cloud with sun
  if (hour >= 17 && hour < 21) return { greeting: "Good Evening", icon: "🌆" }; // Cityscape with sunset
  return { greeting: "Good Night", icon: "🌙" }; // Moon icon
};


const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  const { initialQueue } = usePlayerStore();
  const { isSignedIn} = useAuth(); 
  const { user } = useUser();

  // Fetch songs on component mount
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  // Set up the song queue based on authentication status
  useEffect(() => {
    if (featuredSongs.length === 0) return;

    if (isSignedIn) {
      // Authenticated users: Play all songs
      if (madeForYouSongs.length > 0 && trendingSongs.length > 0) {
        const allSongs = [...madeForYouSongs, ...featuredSongs, ...trendingSongs];
        initialQueue(allSongs);
      }
    } else {
      // Unauthenticated users: Only play first 6 featured songs
      initialQueue(featuredSongs.slice(0, 6));
    }
  }, [madeForYouSongs, featuredSongs, trendingSongs, initialQueue, isSignedIn]);

  const { greeting, icon } = getGreetingWithIcon();

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-6 sm:p-8">
          {/* Animated Time-Based Greeting */}

          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] via-[#2c2b8e] to-[#2c2b8e]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {isSignedIn ? (
              <>
                {greeting}, {user?.firstName|| "there"}!{" "}
                {/* User's First Name with fallback */}
                <span className="ml-2 text-4xl text-red-700">{icon}</span>
              </>
            ) : (
              <>
                {greeting}!{" "}
                <span className="ml-2 text-4xl"></span>
              </>
            )}
          </motion.h1>

          {/* Featured Section */}
          <FeaturedSection />

          <div className="space-y-10 mt-6">
            <SignedIn>
              {/* Made For You Section */}
              <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
              {/* Trending Section */}
              <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
            </SignedIn>

            <SignedOut>
              {/* Signed Out Message */}
              <p className="text-gray-400">Sign in to access personalized playlists!</p>
            </SignedOut>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
