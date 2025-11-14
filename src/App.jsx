import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import siteRoutes from "./siteRoutes"

import './App.css'

function App() {
  const routes = createBrowserRouter(siteRoutes)

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App;
