import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllPokemonQuery,
  useGetAllPokemonFullListQuery,
  useGetPokemonTypeQuery,
  useGetPokemonGenerationQuery,
} from "../store/pokeApiSlice";
import { isFavorite, isCaptured } from "../store/userSlice";

import PokemonList from "./PokemonList";
import Alert from "./Alert";

const TYPE_PAGE_SIZE = 30; // quanti Pokémon per "pagina" nei tipi

export default function Pokedex({
  submittedSearchTerm = "",
  selectedType = null,
  selectedGen = null,
  showFavorites = false,
  showCaptured = false,
  onHoverPokemon,
  scrollToTopSignal = 0,
}) {
  const [pokemonList, setPokemonList] = useState([]); // lista paginata principale
  const [scrollSignal, setScrollSignal] = useState(0);
  const [url, setUrl] = useState({ limit: 30, offset: 0 });

  const [typeList, setTypeList] = useState([]); // lista paginata per tipo
  const [typePage, setTypePage] = useState(1); // pagina corrente per i tipi
  const [genList, setGenList] = useState([]); // lista paginata per generazione
  const [genPage, setGenPage] = useState(1); // pagina corrente per generazione

  // Redux state per favorites/captures
  const userListsState = useSelector((state) => state.user);

  // API
  const {
    data: genData,
    isFetching: isGenFetching,
    error: genError,
  } = useGetPokemonGenerationQuery(selectedGen, { skip: !selectedGen });

  const safeSearch = submittedSearchTerm ?? "";
  const isSearching = safeSearch.trim().length > 0;

  const {
    data: pageData,
    isLoading,
    isFetching,
    error: pageError,
  } = useGetAllPokemonQuery(url);
  const { data: fullListData, error: fullListError } =
    useGetAllPokemonFullListQuery();
  const {
    data: typeData,
    isFetching: isTypeFetching,
    error: typeError,
  } = useGetPokemonTypeQuery(selectedType, { skip: !selectedType });

  // --- Utility: normalizza e ordina per ID ---
  const normalizeAndSort = (list) =>
    (list ?? [])
      .map((p) => ({
        ...p,
        id: Number(p.url.replace(/\/$/, "").split("/").pop()),
      }))
      .sort((a, b) => a.id - b.id);

  // --- Reset tipo / generazione ---
  useEffect(() => {
    setTypePage(1);
    setTypeList([]);
    setScrollSignal((s) => s + 1);
  }, [selectedType]);

  useEffect(() => {
    setGenPage(1);
    setGenList([]);
    setScrollSignal((s) => s + 1);
  }, [selectedGen]);

  useEffect(() => {
    setScrollSignal((s) => s + 1);
  }, [submittedSearchTerm, scrollToTopSignal]);

  // Reset scroll quando si attivano/disattivano favorites/captured
  useEffect(() => {
    setScrollSignal((s) => s + 1);
  }, [showFavorites, showCaptured]);

  // --- Pagine tipo / generazione ---
  useEffect(() => {
    if (!selectedType || !typeData) return;
    setTypeList(normalizeAndSort(typeData).slice(0, TYPE_PAGE_SIZE));
    setTypePage(1);
  }, [typeData, selectedType]);

  useEffect(() => {
    if (!selectedGen || !genData) return;
    setGenList(normalizeAndSort(genData).slice(0, TYPE_PAGE_SIZE));
    setGenPage(1);
  }, [genData, selectedGen]);

  // --- Lista principale ---
  useEffect(() => {
    if (isSearching || selectedType || selectedGen) return;
    if (pageData?.results) {
      setPokemonList((prev) => [
        ...prev,
        ...normalizeAndSort(pageData.results),
      ]);
    }
  }, [pageData, isSearching, selectedType, selectedGen]);

  // --- Lazy load ---
  const handleLoadMore = () => {
    // Lista principale
    if (!selectedType && !selectedGen && !isSearching) {
      if (!pageData?.next || isFetching) return;
      const params = new URL(pageData.next).searchParams;
      setUrl({
        offset: Number(params.get("offset")),
        limit: Number(params.get("limit")),
      });
      return;
    }

    // Tipo
    if (selectedType && typeData && !selectedGen) {
      const nextPage = typePage + 1;
      const nextItems = normalizeAndSort(typeData).slice(
        0,
        nextPage * TYPE_PAGE_SIZE
      );
      setTypeList(nextItems);
      setTypePage(nextPage);
      return;
    }

    // Generazione
    if (selectedGen && genData && !selectedType) {
      const nextPage = genPage + 1;
      const nextItems = normalizeAndSort(genData).slice(
        0,
        nextPage * TYPE_PAGE_SIZE
      );
      setGenList(nextItems);
      setGenPage(nextPage);
      return;
    }

    // Tipo + generazione combinati (usa sempre tutte le entry)
    if (selectedType && selectedGen && typeData && genData) {
      // Nessuna paginazione: mostra sempre l'incrocio completo
      // (se vuoi paginare anche qui, serve logica più complessa)
      setTypePage(1);
      setGenPage(1);
      return;
    }
  };

  // --- Seleziona dataset da mostrare ---
  // Se favorites o captured sono attivi, usiamo sempre la lista completa (non paginata)
  const useFullForLists = showFavorites || showCaptured;

  let rawList;
  if (selectedType && selectedGen && typeData && genData) {
    const fullType = normalizeAndSort(typeData);
    const fullGen = normalizeAndSort(genData);
    const typeIds = new Set(fullType.map((p) => p.id));
    rawList = fullGen.filter((p) => typeIds.has(p.id));
  } else if (selectedType) {
    rawList = useFullForLists ? normalizeAndSort(typeData) : typeList;
  } else if (selectedGen && isSearching) {
    rawList = normalizeAndSort(genData ?? []);
  } else if (selectedGen) {
    rawList = useFullForLists ? normalizeAndSort(genData) : genList;
  } else if (isSearching) {
    rawList = normalizeAndSort(fullListData?.results ?? []);
  } else {
    rawList = useFullForLists
      ? normalizeAndSort(fullListData?.results ?? [])
      : pokemonList;
  }

  // --- Filtri comuni e deduplica ---
  const filteredList = (() => {
    // Filtro base
    let list =
      rawList?.filter((p) => {
        if (!p || !p.url) return false;
        const id = p.id;
        if (p.name.includes("-mega") || id > 10000) return false;
        if (
          isSearching &&
          !p.name.toLowerCase().includes(safeSearch.toLowerCase())
        )
          return false;
        return true;
      }) || [];
    // Deduplica per id
    const seen = new Set();
    list = list.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
    // Filtro favorites/captured
    if (showFavorites) {
      list = list.filter((p) => isFavorite(userListsState, p.id));
    }
    if (showCaptured) {
      list = list.filter((p) => isCaptured(userListsState, p.id));
    }
    return list;
  })();

  const loading = isLoading || isTypeFetching || isGenFetching;

  // Check for errors from any API call
  const apiError = pageError || typeError || genError || fullListError;
  if (apiError) {
    const status = apiError?.status;
    const errorMessage = status
      ? `Failed to load Pokémon data (HTTP ${status})`
      : "Network error. Please check your connection.";

    return (
      <div className="h-full flex items-center justify-center p-4">
        <Alert type="error" message={errorMessage} />
      </div>
    );
  }

  let hasMore;
  if (useFullForLists) {
    // Quando favorites/captured sono attivi mostriamo già l'intero set filtrato
    hasMore = false;
  } else if (selectedType && !selectedGen) {
    hasMore = typeList.length < (typeData?.length ?? 0);
  } else if (selectedGen && !selectedType) {
    hasMore = genList.length < (genData?.length ?? 0);
  } else if (selectedType && selectedGen) {
    const normalizedType = normalizeAndSort(typeData);
    const normalizedGen = normalizeAndSort(genData);
    const typeIds = new Set(normalizedType.map((p) => p.id));
    const combined = normalizedGen.filter((p) => typeIds.has(p.id));
    hasMore = combined.length > rawList.length;
  } else {
    hasMore = !isSearching && pageData?.next;
  }

  return (
    <PokemonList
      items={filteredList}
      loading={loading}
      hasMore={Boolean(hasMore)}
      onLoadMore={handleLoadMore}
      onHoverPokemon={onHoverPokemon}
      scrollSignal={scrollSignal}
    />
  );
}
