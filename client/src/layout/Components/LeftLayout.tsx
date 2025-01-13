import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore"; // Zustand store
import PlayListSkeltons from "@/components/skeltons/PlayListSkeltons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { HomeIcon, LibraryIcon, MessageCircle } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";

const LeftLayout = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              to="/chat"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <LibraryIcon className="mr-2 size-5" />
            <span className="hidden md:inline">PlayLists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlayListSkeltons />
            ) : Array.isArray(albums) && albums.length > 0 ? (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-5 group cursor-pointer"
                >
                  {/* Responsive Image */}
                  <img
                    src={album.imageUrl}
                    alt="Playlist"
                    className="hidden sm:block w-12 h-12 rounded-md flex-shrink-0 object-cover"
                  />
                  {/* Album Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">{album.artist}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-zinc-400">No albums available</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftLayout;
