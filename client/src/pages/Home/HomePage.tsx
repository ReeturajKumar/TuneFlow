import Topbar from "@/components/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

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
  const { isSignedIn } = useAuth(); // Get authentication status

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

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Good Afternoon</h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SignedIn>
              <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
              <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
            </SignedIn>

            <SignedOut>
            </SignedOut>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
