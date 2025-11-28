/**
 * normalizeAndSort
 * Extracts numeric ID from URL and sorts list by ascending ID.
 */
export const normalizeAndSort = (list) =>
  (list ?? [])
    .map((p) => ({
      ...p,
      id: Number(p.url.replace(/\/$/, "").split("/").pop()),
    }))
    .sort((a, b) => a.id - b.id);

/**
 * filterPokemon
 * Applies search term, excludes mega/high-IDs, then filters by favorites/captured.
 */
export const filterPokemon = (list, filters = {}) => {
  const {
    searchTerm = "",
    showFavorites = false,
    showCaptured = false,
    isFavorite,
    isCaptured,
    userState,
  } = filters;

  if (!list?.length) return [];

  let filtered = list.filter((p) => {
    if (!p?.url) return false;
    if (p.name.includes("-mega") || p.id > 10000) return false;
    if (
      searchTerm &&
      !p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (showFavorites && isFavorite && userState) {
    filtered = filtered.filter((p) => isFavorite(userState, p.id));
  }

  if (showCaptured && isCaptured && userState) {
    filtered = filtered.filter((p) => isCaptured(userState, p.id));
  }

  return filtered;
};

/**
 * deduplicateById
 * Removes duplicate Pokémon entries by ID (keeps first occurrence).
 */
export const deduplicateById = (list) => {
  if (!list?.length) return [];
  const seen = new Set();
  return list.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
};

/**
 * combineTypeAndGen
 * Returns intersection of type-filtered and gen-filtered lists (by ID).
 */
export const combineTypeAndGen = (typeData, genData) => {
  if (!typeData || !genData) return [];
  const fullType = normalizeAndSort(typeData);
  const fullGen = normalizeAndSort(genData);
  const typeIds = new Set(fullType.map((p) => p.id));
  return fullGen.filter((p) => typeIds.has(p.id));
};
