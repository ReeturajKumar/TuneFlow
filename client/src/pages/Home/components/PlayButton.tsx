import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, tooglePlay } = usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) {
      tooglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <Button
    size={"icon"}
    onClick={handlePlay}
    className={`absolute bottom-3 right-2 w-10 h-10 rounded-full
      bg-gradient-to-b from-[#5a3db7] to-[#281a6c] shadow-lg  hover:scale-105 transition-all 
      opacity-0 translate-y-2 group-hover:translate-y-0 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
  >
    {isCurrentSong && isPlaying ? (
      <Pause className='size-5 text-white' />
    ) : (
      <Play className='size-5 text-white' />
    )}
  </Button>
  );
};

export default PlayButton;
