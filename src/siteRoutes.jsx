import Layout from './layouts/Layout'
import Homepage from './pages/Homepage'
import Account from './pages/Account'
// Subpages for Account: FavouritesPage and CaughtPage

import About from './pages/About'
import ErrorPage from './pages/ErrorPage'

const siteRoutes = [  {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          Component: Homepage,
          showInNav: true,
        title: 'Pokedex'
        },
        {
          path: 'about',
          Component: About,
          showInNav: true,
          title: 'About'
        },
        {
          path: 'account',
          Component: Account,
          showInNav: true,
          title: 'Account'
        },
        // TO DO: Modify using the correct PokeAPI endpoint
        // {
        //   path: 'product/:id',
        //   Component: Product
        // },
        {
          path: '*',
          Component: ErrorPage
        }
      ]
    }, ]

 export default siteRoutes   