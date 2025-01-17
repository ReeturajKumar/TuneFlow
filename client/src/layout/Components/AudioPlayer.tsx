import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongUrlRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Handle play/pause based on isPlaying state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle song end event
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => playNext();
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  // Handle song change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const isSongChanged = prevSongUrlRef.current !== currentSong.audioUrl;

    if (isSongChanged) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongUrlRef.current = currentSong.audioUrl;

      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
