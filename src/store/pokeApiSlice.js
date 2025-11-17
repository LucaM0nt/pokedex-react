import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeApi = createApi({
    reducerPath: "pokeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    tagTypes: ['pokemon', 'singlePokemon'],
    endpoints: (builder) => ({
        getAllPokemon: builder.query({
            query: ({ limit = 30, offset = 0 } = {}) => `pokemon?limit=${limit}&offset=${offset}`,
            providesTags: ['pokemon'],
        }),
        getPokemon: builder.query({
            query: ( id ) => `pokemon/${id}`,
            providesTags: ['singlePokemon'],
        }),
    }),
});

export const { useGetAllPokemonQuery, useGetPokemonQuery } = pokeApi;