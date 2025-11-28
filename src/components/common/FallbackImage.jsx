import SubstituteArtwork from "../../assets/Substitute_artwork.webp";
import SubstituteSprite from "../../assets/Substitute_sprite.webp";

const DEFAULT_ARTWORK = SubstituteArtwork;
const DEFAULT_SPRITE = SubstituteSprite;

/**
 * FallbackImage
 * A reusable <img> wrapper that applies sensible fallbacks when the source fails.
 *
 * Props:
 * - src: string | undefined — primary image URL
 * - alt: string — alt text
 * - type: 'artwork' | 'sprite' (default: 'sprite') — controls which fallback is used
 * - className: string — classes applied to the <img>
 * - onError: (event) => void — optional custom handler; runs after internal fallback
 * - ...rest: any — forwarded to the <img>
 */
export default function FallbackImage({
  src,
  alt,
  type = "sprite",
  className = "",
  onError,
  ...rest
}) {
  const fallback = type === "artwork" ? DEFAULT_ARTWORK : DEFAULT_SPRITE;

  // Start with fallback immediately if src is missing
  const initialSrc = src || fallback;

  const handleError = (e) => {
    if (!e || !e.currentTarget) return;

    // Prevent infinite loop if fallback image also fails
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback;

    // Call user's custom onError if provided
    if (typeof onError === "function") {
      try {
        onError(e);
      } catch (_) {
        // swallow user handler errors
      }
    }
  };

  return (
    <img
      src={initialSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
}
