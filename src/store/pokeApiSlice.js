import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeApi = createApi({
    reducerPath: "pokeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        getAllPokemon: builder.query({
            query: ({ limit = 151, offset = 0 } = {}) => `pokemon?limit=${limit}&offset=${offset}`,
        }),
    }),
});

export const { useGetAllPokemonQuery } = pokeApi;