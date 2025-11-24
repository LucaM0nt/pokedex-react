import Layout from './layouts/Layout'
import Homepage from './pages/Homepage'
import Account from './pages/Account'
import PokedexEntry from './components/PokedexEntry'
// Subpages for Account: FavouritesPage and CaughtPage

import About from './pages/About'
import ErrorPage from './pages/ErrorPage'

const siteRoutes = [{
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
      path: 'entry/:id',
      Component: PokedexEntry,
      //showInNav: false, // Hides this page from the navbar, it's only accessed through the Pokédex preview
      showInNav: true,
      title: 'Scheda Pokémon'
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
    {
      path: '*',
      Component: ErrorPage,
      showInNav: false
    }
  ]
},]

export default siteRoutes   