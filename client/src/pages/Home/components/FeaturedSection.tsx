import FeaturedGridSkeleton from "@/components/skeltons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative p-2"
        >
          {/* Song Image */}
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />

          {/* Title & Artist (Truncated, Shrinks if Needed) */}
          <div className="flex-1 min-w-0 px-4">
            <p className="font-medium text-white text-sm sm:text-base truncate w-[140px]">
              {song.title}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 truncate w-[90px]">
              {song.artist}
            </p>
          </div>

          {/* Play Button (Properly Positioned, No Overlapping) */}
          <div className="flex-shrink-0">
            <PlayButton song={song} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
