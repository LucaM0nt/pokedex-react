import usePokemonList from "../../hooks/usePokemonList";
import PokemonList from "./PokemonList";
import Alert from "../common/Alert";
import EmptyState from "../common/EmptyState";

export default function Pokedex({
  submittedSearchTerm = "",
  selectedType = null,
  selectedGen = null,
  showFavorites = false,
  showCaptured = false,
  onHoverPokemon,
}) {
  const { items, loading, error, hasMore, scrollSignal, onLoadMore } =
    usePokemonList({
      searchTerm: submittedSearchTerm,
      selectedType,
      selectedGen,
      showFavorites,
      showCaptured,
    });

  // Handle API errors
  if (error) {
    const status = error?.status;
    const errorMessage = status
      ? `Failed to load Pokémon data (HTTP ${status})`
      : "Network error. Please check your connection.";

    return (
      <div className="h-full flex items-center justify-center p-4">
        <Alert type="error" message={errorMessage} />
      </div>
    );
  }

  // Check if no results with active filters
  const hasActiveFilters =
    submittedSearchTerm.trim().length > 0 ||
    selectedType ||
    selectedGen ||
    showFavorites ||
    showCaptured;

  if (!loading && hasActiveFilters && items.length === 0) {
    return (
      <div className="h-full flex items-start justify-center p-4 pt-12">
        <EmptyState
          marginTop={false}
          icon="🔍"
          title="No Pokémon Found"
          message="No results match your current filters. Try adjusting your search criteria or reset the filters to see all Pokémon."
        />
      </div>
    );
  }

  return (
    <PokemonList
      items={items}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={onLoadMore}
      onHoverPokemon={onHoverPokemon}
      scrollSignal={scrollSignal}
    />
  );
}
