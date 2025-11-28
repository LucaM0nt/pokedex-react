import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

/**
 * PokemonCryButton
 * Icon-only button that plays the Pokémon cry for a given numeric id.
 *
 * Props:
 * - pokemonId: number (required)
 * - className: optional className for sizing/spacing
 * - title: optional tooltip (defaults to "Play cry")
 */
export default function PokemonCryButton({ pokemonId, className = "", title = "Play cry" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      try {
        audio.pause();
      } catch (_) {}
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  const onPlay = () => {
    if (!pokemonId) return;
    const audio = audioRef.current;
    if (!audio) return;

    const url = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;

    try {
      // Always reset source and playback position before playing
      audio.src = url;
      audio.currentTime = 0;
      setIsPlaying(true);
      const playPromise = audio.play();
      // Catch browsers that return a Promise from play()
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => setIsPlaying(false));
      }
    } catch (_) {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      aria-label="Play cry"
      title={title}
      className={`inline-flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded ${className}`}
      onClick={onPlay}
      disabled={!pokemonId || isPlaying}
    >
      <FontAwesomeIcon icon={faVolumeHigh} className={`text-lg ${isPlaying ? "opacity-60" : ""}`} />
    </button>
  );
}
