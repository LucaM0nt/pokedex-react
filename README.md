# Pokedex React (Vite + Redux Toolkit)

An educational Pokedex built with React, Vite, Redux Toolkit, and RTK Query that consumes the public PokéAPI. It includes fast search with suggestions, type and generation filters, infinite scrolling, a global login modal, and a user dashboard with favorites and captured Pokémon.

## Features

- Fast client-side search with inline suggestions and keyboard navigation
- Filters by Pokémon type and generation
- Infinite scroll for the main list with smart lazy-loading
- Favorites and Captured lists with instant toggles and persistence in Redux state
- Pokémon detail page with artwork, types, stats, description, and evolution chain
- Global login modal (no dedicated page) that can open from anywhere
- User dashboard showing trainer card plus grids of favorites and captured Pokémon
- URL-driven state (search, type, gen, favorites, captured) for shareable links and back/forward navigation

## Why Redux (and RTK) Instead of Context API

This app started small but quickly needed state that is:

- Used across unrelated parts of the tree (navbar, list items, detail page, dashboard)
- Frequently updated (favorite/capture toggles) and performance-sensitive
- Sourced from asynchronous APIs (PokéAPI) with caching, deduplication, and loading states
- Traceable and debuggable during development

While the Context API is great for static or low-frequency state (theme, locale, current user object), it is not optimized for:

- Frequent updates causing large subtree re-renders
- Advanced cache policies and data invalidation
- Debugging complex flows (who updated what and when)

Redux Toolkit (RTK) plus RTK Query deliver:

- Structured state updates with actions and reducers for clear intent and DevTools time-travel
- Memoized selectors that prevent unnecessary re-renders
- RTK Query for data fetching: built-in caching, request de-duplication, lifecycle flags (isLoading/isFetching), and automatic revalidation
- Excellent ergonomics (createSlice, createApi) with little boilerplate

Concretely in this project:

- Auth state and user lists (favorites/captured) are consumed in the navbar, the list, the entry page, and the dashboard without prop-drilling
- The Pokémon catalog is fetched and cached via RTK Query, so the list, preview, and detail screens reuse results efficiently
- “Favorites/Captured” toggles immediately reflect in all views thanks to centralized state and selectors

If your global state were small and static, Context would be enough. For this app’s cross-cutting, frequently changing state plus API caching needs, Redux Toolkit is the safer, more maintainable choice.

## Tech Stack

- React 18 + Vite
- Redux Toolkit (RTK) + RTK Query
- React Router
- Tailwind-style utility classes for styling
- PokéAPI (https://pokeapi.co/)

## App Structure

```
src/
	components/
		Navbar/ ...
		Pokedex.jsx, PokemonList.jsx, PokemonListItem.jsx, PokemonPreview.jsx
		Searchbar.jsx, SearchFilters.jsx
		PokedexEntry/ (info, description, stats, evolution chain)
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
```

## URL State and Custom Hooks

- `usePokedexQueryParams`: reads and updates `search`, `type`, `gen`, `favorites`, `captured` in a consistent order. Both Searchbar and SearchFilters use it, so typing Enter, clicking a suggestion, or toggling a filter keeps the URL in sync.
- `usePokemonActions`: wraps favorite/capture selectors and toggle actions so `PokemonListItem` and `PokedexEntry` share the same logic.
- `useAuth`: exposes `isLogged`, `username`, and `logout` for Navbar and User page.
- `useClickOutside`: reusable for dropdowns/modals that should close when clicking outside.

## Global Login Modal

- The Login button in the Navbar opens a global modal managed by Redux (`loginModalOpen`) and rendered in `Layout.jsx` so it overlays on any page.
- On confirm, the app dispatches `login`, closes the modal, and navigates to `/user`.
- The overlay uses a semi-transparent, blurred backdrop so the page remains visible.

## Data Loading and Pagination

- Main list uses infinite scroll and page URLs from PokéAPI via RTK Query.
- When Favorites or Captured filters are active, the app switches to filter against the full dataset (not only loaded pages) for correctness, and disables lazy-load until those filters are off.

## Getting Started

Prerequisites:

- Node.js 18+ (recommended)

Install dependencies:

```powershell
npm install
```

Start development server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Key Commands and Scripts

- `npm run dev`: runs Vite dev server with fast HMR
- `npm run build`: builds the app for production
- `npm run preview`: serves the production build locally

## Notes on Styling

- The project uses utility classes (Tailwind-style). No special setup beyond the defaults used in this repo is required to run it.

## Contributing

- Keep changes focused and small
- Prefer RTK/RTK Query patterns for state and data
- Reuse custom hooks where possible
- Ensure URL param updates go through `usePokedexQueryParams`

## Authors

- Project Repository: https://github.com/LucaM0nt/pokedex-react
- Luca Montanaro — https://github.com/LucaM0nt
- Gloria Paita — https://github.com/Gloria-Pi

## Acknowledgements

- PokéAPI for the dataset: https://pokeapi.co/

## License

This repository does not currently declare a license.
