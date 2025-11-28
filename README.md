# Pokédex React

A modern, educational Pokédex web app built with React 18, Vite, Redux Toolkit, and RTK Query, consuming the public [PokéAPI](https://pokeapi.co/). The app features fast search with suggestions, type and generation filters, infinite scrolling, a global login modal, and a user dashboard for favorites and captured Pokémon.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Installation & Getting Started](#installation--getting-started)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Design & Architectural Choices](#design--architectural-choices)
- [External Libraries: Rationale & Integration](#external-libraries-rationale--integration)
- [Known Issues & Limitations](#known-issues--limitations)
- [Authors](#authors)

---

## Project Overview

**Pokédex React** is a feature-rich Pokédex web application designed for educational purposes. It allows users to browse, search, and filter Pokémon, view detailed stats and evolution chains, and manage personal lists of favorites and captured Pokémon. The app demonstrates best practices in modern React development, state management, and API integration.

---

## Tech Stack & Dependencies

- **React**: 18.x (UI library)
- **Vite**: 4.x+ (build tool for fast development)
- **Redux Toolkit**: 1.9.x (state management)
- **RTK Query**: (data fetching, caching, and API integration)
- **React Router**: 6.x (routing)
- **Tailwind CSS (utility classes)**: via custom classes (no Tailwind dependency)
- **FontAwesome**: 6.x (iconography)
- **PokéAPI**: [https://pokeapi.co/](https://pokeapi.co/) (data source)

> See `package.json` for exact versions.

---

## Installation & Getting Started

**Prerequisites:**

- Node.js 18+ (recommended)
- npm 9+ (or compatible)

**Clone the repository:**

```bash
git clone https://github.com/LucaM0nt/pokedex-react.git
cd pokedex-react
```

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

**Start the client server:**

```bash
npm run build
```

**Preview the production build locally:**

```bash
npm run preview
```

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## API Reference

This app uses the public [PokéAPI](https://pokeapi.co/), a RESTful API providing comprehensive Pokémon data.

- **API Base URL:** `https://pokeapi.co/api/v2/`
- **Documentation:** [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)
- **Endpoints Used:**
  - `/pokemon` (list, details, search)
  - `/type` (type filtering)
  - `/generation` (generation filtering)
  - `/pokemon-species` (species, evolution chains)
  - Others as needed for stats, abilities, etc.

All API requests are handled via RTK Query, with aggressive caching for static data.

---

## Project Structure

```
src/
	components/
		Navbar/...
		Pokedex.jsx, PokemonList.jsx, PokemonListItem.jsx, PokemonPreview.jsx
		Searchbar.jsx, SearchFilters.jsx
		pokedex-entry/ (info, description, stats, evolution chain)
		LoginModal.jsx
	hooks/
		useAuth.js                # isLogged, username, logout
		usePokemonActions.js      # favorite/capture toggles + flags
		useClickOutside.js        # close dropdowns on outside click
		usePokedexQueryParams.js  # one source of truth for URL params
	layouts/
		Layout.jsx                # global header/footer + global login modal mount
	pages/
		Homepage.jsx, Account.jsx (User), PokedexEntry.jsx
	store/
		userSlice.js, pokeApiSlice.js, index.js
	utils/
		pokemonEntryUtils.jsx, pokemonListUtils.jsx
	constants/
		pokemonTypes.js, pokemonRegions.js, pokemonGenerations.js
```

---

## Design & Architectural Choices

### Why Redux Toolkit (RTK) and RTK Query?

- **Global State Needs:** The app requires state (auth, favorites, captured lists) to be shared across unrelated components (navbar, list, detail, dashboard) without prop-drilling.
- **Performance:** Frequent updates (favorite/capture toggles) and API data require memoized selectors and efficient cache management.
- **API Caching:** RTK Query provides built-in caching, request de-duplication, and lifecycle flags, which are difficult to achieve with Context API or plain React state.
- **Debuggability:** Redux DevTools and time-travel debugging are invaluable for development and troubleshooting.
- **URL-Driven State:** Custom hooks (`usePokedexQueryParams`) ensure that search/filter state is always reflected in the URL, supporting shareable and navigable links.

**Why not Context API?**

- Context is ideal for static or rarely-changing state (theme, locale), but not for high-frequency updates or complex API caching.

### Routing

- **React Router v6** is used for declarative, nested routing, enabling clean separation of pages and layouts.

### Styling

- **Utility-first CSS** (Tailwind-style classes) is used for rapid, consistent styling without the overhead of a full CSS framework.

---

## External Libraries: Rationale & Integration

### Redux Toolkit & RTK Query

- **Problem Solved:** Centralized, predictable state management and advanced API caching.
- **Necessity:** Needed for cross-component state, efficient updates, and API cache policies (vs. React state/Context).
- **Integration:** Store is configured in `store/index.js`, slices in `userSlice.js` and `pokeApiSlice.js`. RTK Query endpoints are defined in `pokeApiSlice.js`.

### React Router

- **Problem Solved:** Declarative, nested routing for SPA navigation.
- **Necessity:** Enables clean page structure and navigation without manual state management.
- **Integration:** Routes are defined in `siteRoutes.jsx` and provided via `RouterProvider` in `App.jsx`.

### FontAwesome

- **Problem Solved:** Provides scalable, accessible icons for UI elements.
- **Necessity:** Ensures consistent iconography without custom SVGs.
- **Integration:** Used in components like About, navigation, and action buttons.

---

## Known Issues & Limitations

- **PokéAPI Rate Limits:** The public API may throttle requests if usage is too high. Heavy filtering (e.g., all generations/types) may trigger more requests, that's handled using caching thanks to Redux Toolkit & RTK Query.
- **No User Authentication Backend:** Login is simulated client-side; no real user accounts or persistence beyond localStorage.
- **No Offline Support:** The app does not cache APIs' data on local storage for offline use.
- **No Dedicated Error Pages:** Some API/network errors may show generic messages.
- **No Accessibility Audit:** While semantic HTML and ARIA roles are used, a full accessibility audit has not been performed.

---

## Authors

- **Project Repository:** [https://github.com/LucaM0nt/pokedex-react](https://github.com/LucaM0nt/pokedex-react)
- **Luca Montanaro** — [https://github.com/LucaM0nt](https://github.com/LucaM0nt)
- **Gloria Paita** — [https://github.com/Gloria-Pi](https://github.com/Gloria-Pi)

---

---

_All Pokémon and their information are the property of The Pokémon Company._
