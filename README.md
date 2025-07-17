# Pokemon Table (Next.js)

A modern, responsive web app to browse, search, and explore Pokémon data, built with [Next.js](https://nextjs.org), [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [@tanstack/react-table](https://tanstack.com/table/v8). Data is fetched live from the [PokeAPI](https://pokeapi.co/).

![Pokemon List Screenshot](public/pokemon.webp)

---

## Features

- **Paginated Pokémon Table**: Browse Pokémon with pagination and ability details.
- **Search**: Search Pokémon by name with instant results.
- **Detail Modal**: Click a Pokémon to view detailed info (image, types, abilities, stats) in a modal.
- **Evolution Triggers Table**: View and paginate through evolution triggers from the API.
- **Responsive UI**: Clean, mobile-friendly design using Tailwind CSS.
- **Server-Side Rendering**: Fast initial load and SEO-friendly.
- **Centralized State Management**: Uses Zustand for managing search, modal, and Pokémon state.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev, pnpm dev, bun dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
  components/      # Reusable React components and types
    Header.tsx         # App header with logo
    SearchBar.tsx      # Search input for Pokémon
    PokemonTable.tsx   # Main table with pagination and modal
    EvolutionTable.tsx # Table for evolution triggers
    Modal.tsx          # Generic modal dialog
    PokemonPage.tsx    # Page container for table/search/evolution
    types.ts           # Shared TypeScript types and Zustand store
  styles/
    globals.css    # Tailwind and global styles
  layout.tsx       # App layout and font setup
  page.tsx         # Main page, SSR entry point
public/            # Static assets (e.g., pokemon.webp logo)
```

---

## Design Notes

- **TypeScript**: Strict typing for safety and maintainability. Shared types and the Zustand store are defined in `app/components/types.ts`.
- **Zustand State Management**: All search, modal, and Pokémon state is managed centrally using Zustand, making the codebase more maintainable and scalable.
- **React Table**: Efficient, flexible table rendering and pagination.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Next.js SSR**: Server-side data fetching for fast, SEO-friendly pages.

---

## Linting & Formatting

- ESLint is set up for Next.js and TypeScript: `npm run lint`
- Follows Next.js and core web vitals best practices.

---

## Future Improvements

### Features & UX

- Add Pokémon type filters and sorting.
- Add more detailed Pokémon info (stats, moves, evolutions, etc.).
- Add user favorites/bookmarks (using Zustand for state).
- Improve error handling and loading states.
- Add dark mode toggle.
- Add accessibility improvements (a11y).

### Code & Design

- Further modularize Zustand store for larger state needs.
- Extract API logic to a separate utility/service layer.
- Add custom hooks for data fetching and caching.
- Modularize components further for reusability.

### Testing

- **Unit Tests**: Add tests for components and Zustand store using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).
- **Integration/E2E Tests**: Add [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) for end-to-end testing.
- Example test structure:
  ```
  __tests__/
    PokemonTable.test.tsx
    EvolutionTable.test.tsx
    types.test.ts
  ```
- Add GitHub Actions or similar CI for automated testing and linting.

### Documentation

- Add more usage examples and screenshots.
- Document API endpoints and data structures.
- Document Zustand state structure and usage.

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea before submitting a PR.
