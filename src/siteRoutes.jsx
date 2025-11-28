import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import Account from "./pages/Account";
import PokedexEntry from "./pages/PokedexEntry";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

const siteRoutes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Homepage,
        showInNav: true,
        title: "Pokédex",
      },
      {
        path: "entry/:id",
        Component: PokedexEntry,
        showInNav: false, // Hides this page from the navbar, it's only accessed through the Pokédex preview
        title: "Scheda Pokémon",
      },
      {
        path: "about",
        Component: About,
        showInNav: true,
        title: "About",
      },
      {
        path: "login",
        Component: Account,
        showInNav: "conditional", // Will be handled by Navbar
        title: "Login",
      },
      {
        path: "user",
        Component: Account,
        showInNav: "conditional", // Will be handled by Navbar
        title: "User",
      },
      {
        path: "*",
        Component: ErrorPage,
        showInNav: false,
      },
    ],
  },
];

export default siteRoutes;
