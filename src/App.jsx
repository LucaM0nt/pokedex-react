import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import siteRoutes from "./siteRoutes"

import './App.css'

function App() {
  const routes = createBrowserRouter(siteRoutes)

  return (
    <>
      <RouterProvider router={routes} />
      <ul>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App;
