import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Normalize reading boolean params
const readBool = (sp, key) => sp.get(key) === "true";

export default function usePokedexQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || null;
    const genRaw = searchParams.get("gen");
    const gen = genRaw ? Number(genRaw) : null;
    const favorites = readBool(searchParams, "favorites");
    const captured = readBool(searchParams, "captured");
    return { search, type, gen, favorites, captured };
  }, [searchParams]);

  const buildParams = useCallback((next) => {
    const params = new URLSearchParams();
    // Order: search, type, gen, favorites, captured
    if (next.search) params.append("search", next.search);
    if (next.type) params.append("type", next.type);
    if (next.gen) params.append("gen", String(next.gen));
    if (next.favorites) params.append("favorites", "true");
    if (next.captured) params.append("captured", "true");
    return params;
  }, []);

  const apply = useCallback(
    (patch) => {
      const next = { ...value, ...patch };
      setSearchParams(buildParams(next));
    },
    [value, setSearchParams, buildParams]
  );

  const setSearch = useCallback((search) => apply({ search }), [apply]);
  const setType = useCallback((type) => apply({ type }), [apply]);
  const setGen = useCallback((gen) => apply({ gen }), [apply]);
  const toggleFavorites = useCallback(
    () => apply({ favorites: !value.favorites }),
    [apply, value.favorites]
  );
  const toggleCaptured = useCallback(
    () => apply({ captured: !value.captured }),
    [apply, value.captured]
  );
  const resetAll = useCallback(
    () => setSearchParams(new URLSearchParams()),
    [setSearchParams]
  );

  return {
    ...value,
    setSearch,
    setType,
    setGen,
    toggleFavorites,
    toggleCaptured,
    resetAll,
    apply,
  };
}
