import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useGetAllPokemonQuery } from "./store/pokeApiSlice";
import siteRoutes from "./siteRoutes"

import './App.css'

function App() {
  const routes = createBrowserRouter(siteRoutes)
  const { data, error, isLoading } = useGetAllPokemonQuery(); 

  return (
    <>
      <ul>
        {data?.results?.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <RouterProvider router={routes} />
    </>
  )
}

export default App;
