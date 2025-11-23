import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      providesTags: ["singlePokemon"],
    }),

    // Pokémon species
    getPokemonSpecies: builder.query({
      query: (id) => `pokemon-species/${id}`,
      providesTags: ["pokemonSpecies"],
    }),

    // Pokémon by type
    getPokemonType: builder.query({
      query: (typeName) => `type/${typeName}`,
      transformResponse: (response) =>
        response.pokemon.map((item) => item.pokemon),
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
      providesTags: ["allPokemon"],
    }),

    getPokemonGeneration: builder.query({
      query: (genId) => `generation/${genId}`,
      transformResponse: (response) =>
        response.pokemon_species.map((p) => ({
          name: p.name,
          url: p.url.replace("pokemon-species", "pokemon"), // convert species → pokemon
        })),
      providesTags: ["pokemonGeneration"],
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
} = pokeApi;
