import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

/**
 * PokemonCryButton
 *
 * Small, reusable, icon-only button that plays the Pokémon "cry" audio
 * for a given Pokémon ID using the official public cries repository.
 *
 * The component manages a single HTMLAudioElement for predictable playback,
 * avoids overlapping plays, and cleans up listeners on unmount.
 *
 * Accessibility: provides an aria-label and keyboard-focus styles.
 */
export default function PokemonCryButton({
  pokemonId,
  className = "",
  title = "Play cry",
}) {
  /**
   * A persistent Audio element used across clicks.
   * Avoids creating a new element each time and makes cleanup explicit.
   */
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- Setup & teardown of the Audio element ---------------------------------
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

  /**
   * onPlay
   * Loads the cry for the provided pokemonId and plays from the start.
   * Uses a stable URL pattern maintained by the community repository.
   */
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
      /*
       * UI/Accessibility: icon-only button with visible focus ring and
       * subtle hover. Rounded shape helps when placed inline near text.
       */
      className={`inline-flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded cursor-pointer disabled:cursor-not-allowed ${className}`}
      onClick={onPlay}
      disabled={!pokemonId || isPlaying}
    >
      <FontAwesomeIcon
        icon={faVolumeHigh}
        /* When playing, reduce opacity to indicate a transient disabled state */
        className={`text-lg pointer-events-none ${
          isPlaying ? "opacity-60" : ""
        }`}
      />
    </button>
  );
}