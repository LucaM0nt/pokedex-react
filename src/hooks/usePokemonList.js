import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllPokemonQuery,
  useGetAllPokemonFullListQuery,
  useGetPokemonTypeQuery,
  useGetPokemonGenerationQuery,
} from "../store/pokeApiSlice";
import { isFavorite, isCaptured } from "../store/userSlice";
import {
  normalizeAndSort,
  filterPokemon,
  deduplicateById,
  combineTypeAndGen,
} from "../utils/pokemonListUtils";

const PAGE_SIZE = 30;

export default function usePokemonList({
  searchTerm = "",
  selectedType = null,
  selectedGen = null,
  showFavorites = false,
  showCaptured = false,
} = {}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [url, setUrl] = useState({ limit: PAGE_SIZE, offset: 0 });
  const [typePage, setTypePage] = useState(1);
  const [genPage, setGenPage] = useState(1);
  const [scrollSignal, setScrollSignal] = useState(0);

  const userState = useSelector((state) => state.user);
  const isSearching = searchTerm.trim().length > 0;
  const useFullList = showFavorites || showCaptured;

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

  const {
    data: genData,
    isFetching: isGenFetching,
    error: genError,
  } = useGetPokemonGenerationQuery(selectedGen, { skip: !selectedGen });

  useEffect(() => {
    setTypePage(1);
    setScrollSignal((s) => s + 1);
  }, [selectedType]);

  useEffect(() => {
    setGenPage(1);
    setScrollSignal((s) => s + 1);
  }, [selectedGen]);

  useEffect(() => {
    setScrollSignal((s) => s + 1);
  }, [searchTerm, showFavorites, showCaptured]);

  useEffect(() => {
    if (isSearching || selectedType || selectedGen) return;
    if (pageData?.results) {
      setPokemonList((prev) => [
        ...prev,
        ...normalizeAndSort(pageData.results),
      ]);
    }
  }, [pageData, isSearching, selectedType, selectedGen]);

  useEffect(() => {
    if (selectedType || selectedGen || isSearching) {
      setPokemonList([]);
      setUrl({ limit: PAGE_SIZE, offset: 0 });
    }
  }, [selectedType, selectedGen, isSearching]);

  const rawList = useMemo(() => {
    if (selectedType && selectedGen && typeData && genData) {
      return combineTypeAndGen(typeData, genData);
    }

    if (selectedType) {
      const normalized = normalizeAndSort(typeData);
      return useFullList
        ? normalized
        : normalized.slice(0, typePage * PAGE_SIZE);
    }

    if (selectedGen) {
      const normalized = normalizeAndSort(genData);
      if (isSearching) return normalized;
      return useFullList
        ? normalized
        : normalized.slice(0, genPage * PAGE_SIZE);
    }

    if (isSearching) {
      return normalizeAndSort(fullListData?.results ?? []);
    }

    return useFullList
      ? normalizeAndSort(fullListData?.results ?? [])
      : pokemonList;
  }, [
    selectedType,
    selectedGen,
    typeData,
    genData,
    isSearching,
    fullListData,
    pokemonList,
    useFullList,
    typePage,
    genPage,
  ]);

  const filteredList = useMemo(() => {
    const filtered = filterPokemon(rawList, {
      searchTerm,
      showFavorites,
      showCaptured,
      isFavorite,
      isCaptured,
      userState,
    });

    return deduplicateById(filtered);
  }, [rawList, searchTerm, showFavorites, showCaptured, userState]);

  const hasMore = useMemo(() => {
    if (useFullList) return false;

    if (selectedType && !selectedGen) {
      const total = normalizeAndSort(typeData ?? []).length;
      return typePage * PAGE_SIZE < total;
    }

    if (selectedGen && !selectedType) {
      const total = normalizeAndSort(genData ?? []).length;
      return genPage * PAGE_SIZE < total;
    }

    if (selectedType && selectedGen) return false;

    return !isSearching && Boolean(pageData?.next);
  }, [
    useFullList,
    selectedType,
    selectedGen,
    typeData,
    genData,
    typePage,
    genPage,
    isSearching,
    pageData,
  ]);

  const handleLoadMore = () => {
    if (!selectedType && !selectedGen && !isSearching) {
      if (!pageData?.next || isFetching) return;
      const params = new URL(pageData.next).searchParams;
      setUrl({
        offset: Number(params.get("offset")),
        limit: Number(params.get("limit")),
      });
      return;
    }

    if (selectedType && !selectedGen) {
      setTypePage((prev) => prev + 1);
      return;
    }

    if (selectedGen && !selectedType) {
      setGenPage((prev) => prev + 1);
    }
  };

  const loading = isLoading || isTypeFetching || isGenFetching;
  const error = pageError || typeError || genError || fullListError;

  return {
    items: filteredList,
    loading,
    error,
    hasMore,
    scrollSignal,
    onLoadMore: handleLoadMore,
  };
}
