import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * pokeApi
 * RTK Query API for PokeAPI endpoints.
 * Uses aggressive caching (keepUnusedDataFor: Infinity) for static data.
 */
export const pokeApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: [
    "pokemon",
    "singlePokemon",
    "pokemonSpecies",
    "pokemonTypes",
    "pokemonByName",
    "allPokemon",
    "pokemonGeneration",
    "lastPokemon",
  ],
  endpoints: (builder) => ({
    // Paginated list
    getAllPokemon: builder.query({
      query: ({ limit = 30, offset = 0 } = {}) =>
        `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: ["pokemon"],
    }),

    // Single Pokémon by ID
    getPokemon: builder.query({
      query: (id) => `pokemon/${id}`,
      keepUnusedDataFor: Infinity,
      providesTags: ["singlePokemon"],
    }),

    // Pokémon species
    getPokemonSpecies: builder.query({
      query: (id) => `pokemon-species/${id}`,
      keepUnusedDataFor: Infinity,
      providesTags: ["pokemonSpecies"],
    }),

    // Pokémon by type
    getPokemonType: builder.query({
      query: (typeName) => `type/${typeName}`,
      transformResponse: (response) =>
        response.pokemon.map((item) => item.pokemon),
      keepUnusedDataFor: Infinity,
      providesTags: ["pokemonTypes"],
    }),

    // Search by name (Ace ➝ ace)
    searchPokemonByName: builder.query({
      query: (name) => `pokemon/${name.toLowerCase()}`,
      providesTags: ["pokemonByName"],
    }),

    // Full list (for heavy client-side filtering)
    getAllPokemonFullList: builder.query({
      query: () => `pokemon?limit=20000&offset=0`,
      keepUnusedDataFor: Infinity,
      providesTags: ["allPokemon"],
    }),

    getPokemonGeneration: builder.query({
      query: (genId) => `generation/${genId}`,
      transformResponse: (response) =>
        response.pokemon_species.map((p) => ({
          name: p.name,
          url: p.url.replace("pokemon-species", "pokemon"), // convert species → pokemon
        })),
      keepUnusedDataFor: Infinity,
      providesTags: ["pokemonGeneration"],
    }),

    /**
     * getLastPokemon
     * Two-step query to fetch the last valid Pokémon without downloading the full list:
     * 1. Fetch species metadata to get total count
     * 2. Fetch last species entry via offset, extract ID, and fetch pokemon data
     */
    getLastPokemon: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // 1) get metadata (contains `count`)
        const metaRes = await fetchWithBQ(`pokemon-species?limit=1`);
        if (metaRes.error) return { error: metaRes.error };

        const count = metaRes.data?.count;
        if (!count || typeof count !== "number") {
          return { error: { message: "Could not determine species count" } };
        }

        // 2) fetch only the last species entry via offset
        const lastRes = await fetchWithBQ(
          `pokemon-species?limit=1&offset=${count - 1}`
        );
        if (lastRes.error) return { error: lastRes.error };

        const lastEntry = lastRes.data?.results?.[0];
        if (!lastEntry || !lastEntry.url) {
          return {
            error: { message: "Failed to retrieve last species entry" },
          };
        }

        // 3) extract numeric ID from species URL and fetch the actual pokemon
        const match = lastEntry.url.match(/pokemon-species\/(\d+)\/?$/);
        const lastId = match ? Number(match[1]) : null;
        if (!lastId)
          return { error: { message: "Failed to parse last Pokémon ID" } };

        const pokemonRes = await fetchWithBQ(`pokemon/${lastId}`);
        if (pokemonRes.error) return { error: pokemonRes.error };

        return { data: pokemonRes.data };
      },
      keepUnusedDataFor: Infinity,
      providesTags: ["lastPokemon"],
    }),
  }),
});

export const {
  useGetAllPokemonQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonTypeQuery,
  useSearchPokemonByNameQuery,
  useGetAllPokemonFullListQuery,
  useGetPokemonGenerationQuery,
  useGetLastPokemonQuery,
} = pokeApi;
