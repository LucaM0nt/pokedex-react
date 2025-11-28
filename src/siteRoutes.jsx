import { lazy } from "react";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

// Lazy-loaded pages (accessed via user interaction)
const PokedexEntry = lazy(() => import("./pages/PokedexEntry"));
const Account = lazy(() => import("./pages/Account"));

/**
 * siteRoutes
 * Route configuration for React Router with custom metadata.
 * 
 * Structure:
 * - All routes nested under Layout (provides Header/Footer/LoginModal)
 * - Eager-loaded: Homepage, About, ErrorPage (needed immediately)
 * - Lazy-loaded: PokedexEntry, Account (split into separate chunks)
 * 
 * Custom properties:
 * - showInNav: Controls navbar visibility (true | false | "conditional")
 *   - "conditional": Navbar decides based on auth state (Login vs User link)
 * - title: Display name for navigation (used by Navbar component)
 */
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
        title: "Pokémon Entry",
      },
      {
        path: "about",
        Component: About,
        showInNav: true,
        title: "About",
      },
      // Both /login and /user point to Account component (handles routing internally)
      {
        path: "login",
        Component: Account,
        showInNav: "conditional", // Navbar shows "Login" when not authenticated
        title: "Login",
      },
      {
        path: "user",
        Component: Account,
        showInNav: "conditional", // Navbar shows "User" when authenticated
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
