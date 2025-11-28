import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import siteRoutes from "./siteRoutes"
import Alert from './components/common/Alert'

import './App.css'

/**
 * App
 * Root component that configures React Router and lazy loading.
 * 
 * Setup:
 * - Creates browser router from siteRoutes config
 * - Wraps RouterProvider in Suspense for code-splitting fallback
 * - Shows Alert during lazy chunk loading (PokedexEntry, Account)
 */
function App() {
  const routes = createBrowserRouter(siteRoutes)

  return (
    <Suspense fallback={<Alert type="info" message="Loading..." className="m-4" />}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default App;
