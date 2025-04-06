# CV Library Job Search

A modern job search interface built with Next.js 15 App Router, featuring real-time location autocomplete, multilingual support, and URL-driven state management - powered by a custom CSS design system.

![Job Search Interface](public/desktop-hero-2.png)

## Architectural Highlights

1. **Compositional UI** - The render props pattern allows component consumers to customize presentation while the core handles complex behaviors
2. **Type-safe interactions** - End-to-end TypeScript integration with discriminated unions ensures robust error handling
3. **Performance optimization** - Server Components for data fetching paired with client interactivity creates an optimal user experience
4. **Internationalization by design** - Built-in multilingual support with locale-specific routing enhances accessibility
5. **State preservation** - URL-driven state management with NUQS enables shareable application states

### Frontend

- **Next.js 15 App Router**: Server components enable hybrid rendering, fetching location data and passing promises to client components, which unwrap the promises on the client using the `use` hook, optimizing initial load performance while maintaining interactivity.
- **NUQS**: URL-based state management enables shareable search states and seamless server/client synchronization.
- **CSS Modules and CSS Variables**: Custom design system with design tokens using CSS variables, utility classes, and component variants.
- **next-intl**: Internationalization with EN/FR/ES support and locale-specific routing.
- **TypeScript**: End-to-end type safety with discriminated unions for error and success states.

## Key Features

- **Smart Location Autocomplete**:

  - **Headless Component Architecture**:

    - Separation of core logic from UI presentation
    - Accessibility-first design with ARIA attributes
    - Keyboard navigation and focus management

  - **Render Props Pattern**:

    - Complete UI customization through `renderItem` prop
    - Composable with design system components (HStack, Label)
    - State-aware rendering with highlighted/selected indicators

  - **Production-Ready Implementation**:
    - Real-time API integration with location service
    - Elegant loading, error, and empty states
    - Character validation with user feedback
    - Consistent styling with automatic hover states

- **Multilingual Interface**:

  - Complete internationalization with URL-based locale switching
  - Translation files for English, French, and Spanish
  - Server and client component translation separation

- **Responsive Design**:

  - Mobile-first approach with CSS Grid and flexible layouts
  - Custom spacing system for consistent component relationships
  - Form elements that adapt to different viewport sizes

- **Hybrid Rendering**:
  - Server-side data fetching for optimal loading performance
  - Progressive enhancement with client-side interactivity
  - Streaming with Suspense for improved user experience

## Architectural Decisions

### Feature-Sliced Design-inspired File Structure

The project adopts a simplified version of Feature-Sliced Design (FSD) for code organization:

```
src/
├── features/          # Business domains
│   └── job-search/    # Domain-specific feature
│       ├── ui/        # Presentational components
│       ├── api/       # API clients & queries
│       └── models/    # Type definitions & schemas
├── components/        # Shared UI primitives
├── styles/            # Global styles & design system
└── lib/               # Generic utilities
```

This structure provides clear boundaries between different concerns, enabling:

1. **Better code navigation** by grouping related files
2. **Improved maintainability** through isolation of feature modules
3. **Easier onboarding** for new developers through consistent patterns
4. **Scalability** as new features can be added without affecting existing ones

### Design System with CSS Variables

The project implements a comprehensive design system using CSS custom properties instead of a UI framework like Tailwind:

```css
/* Scale-based tokens in tokens.css */
:root {
  --primary-300: oklch(55% 0.15 250);
  --space-md: 0.75rem;
  --text-lg: 1rem;
  --form-element-height: 2.8125rem;
}
```

This approach provides several benefits:

1. **Visual consistency** through centralized design tokens
2. **Reduced bundle size** by avoiding external UI libraries
3. **Improved performance** with native CSS instead of utility class processing
4. **Better maintainability** through semantic variable naming

### URL-Driven State with NUQS and Promise Unwrapping

The application implements a powerful data flow pattern combining URL-based state management with React 19's `use()` hook:

```typescript
// NUQS configuration with validation and throttling
export const searchParamsObject = {
  keywords: parseAsString.withDefault("").withOptions({
    throttleMs: 300, // Throttle keyword search to prevent API spam
    shallow: true, // No server requests when URL changes
  }),
  location: parseAsString.withDefault("").withOptions({
    throttleMs: 750, // Higher throttle for location search
    shallow: false, // Server requests when URL changes
  }),
};
```

This URL-driven state approach offers significant advantages:

1. **Shareable links** preserve search state for collaboration
2. **Browser history integration** works naturally with back/forward navigation
3. **Server/client synchronization** maintains consistent state
4. **SEO benefits** from meaningful URL parameters
5. **Performance optimization** through throttling and selective server requests

The NUQS state management pairs naturally with React's `use()` hook to handle both synchronous and asynchronous data:

```typescript
// From auto-complete.tsx
export function AutoComplete<T extends AutocompleteSuggestion>({
  suggestions, // Can be either T[] or Promise<FetchResult<T[]>>
}: AutoCompleteProps<T>) {
  // Unwrap promise if needed, otherwise use as-is
  const resolvedSuggestions = suggestions instanceof Promise ? use(suggestions) : suggestions;

  // Process resolved data appropriately
  // ...
}

// From location-search.tsx
export function LocationSearch({ suggestionsPromise }: LocationSearchProps) {
  const { location, setLocation } = useStoreSearchParams(); // NUQS hook

  // Can switch between API data and static data as needed
  return (
    <AutoComplete<LocationRTO>
      suggestions={suggestionsPromise} // Promise from server component
      // Static option: suggestions={staticLocations}
      onSelect={(item) => setLocation(item.label)}
    />
  );
}
```

This combined pattern enables:

1. **Data source flexibility** - Components accept both static arrays and API promises
2. **Suspense integration** - Automatic loading states through React Suspense
3. **Progressive enhancement** - Server components fetch data and prepare it as a promise, client components unwrap the promise using the `use()` hook
4. **Graceful degradation** - Fallback to static data when needed
5. **Unified state management** - URL parameters drive both UI state and data fetching, making server/client state synchronization seamless

### Headless Component Pattern

The Location Autocomplete implements a powerful headless component pattern:

```typescript
// Core functionality without UI (auto-complete-headless.tsx)
export function AutocompleteHeadless<T>({ suggestions, onSelect, itemToString, inputValue, onInputChange, children }: AutocompleteHeadlessProps<T>) {
  // State and behavior logic...

  return children({
    inputProps, // Props for the input element
    listProps, // Props for the suggestion list
    getItemProps, // Function to get props for each suggestion item
    isOpen, // Whether the dropdown is open
    highlightedIndex, // Currently highlighted item index
    suggestions, // Filtered suggestions
    inputValue, // Current input value
  });
}

// Example usage with custom rendering (location-search.tsx)
<AutoComplete<LocationRTO>
  suggestions={suggestionsPromise}
  // Other props...
  renderItem={({ item, isHighlighted }) => (
    <HStack space="sm" align="center" className={"w-full"}>
      <Label variant="default" weight="medium">
        {item.label}
      </Label>
      <Label variant="muted" size="sm" weight="normal">
        {item.value}
      </Label>
    </HStack>
  )}
/>;
```

This pattern offers several key advantages:

1. **Separation of concerns** - Logic and UI can evolve independently
2. **Improved testability** - Core behaviors can be tested in isolation
3. **Maximum flexibility** - UI can be completely customized
4. **Accessibility built-in** - ARIA attributes handled by the core component

### Type-Safe API Layer

The application implements a robust pattern for API interactions:

```typescript
// Discriminated union type for success/error states
export type FetchResult<T> = { status: "success"; data: T } | { status: "error"; message: string };

// Helper functions enforce the correct Success shape
export const handleSuccess = <T>(data: T): FetchResult<T> => ({
  status: "success",
  data,
});

// Helper functions enforce the correct Error shape
export const handleError = (message: string): FetchResult<never> => ({
  status: "error",
  message,
});
```

This pattern provides several benefits:

1. **Compile-time error checking** prevents invalid state combinations
2. **Exhaustive pattern matching** with TypeScript ensures all cases are handled
3. **Consistent error handling** across the application
4. **Self-documenting code** clearly shows possible outcomes

### Internationalization Strategy

The application uses next-intl for localization:

```typescript
// Locale detection and message loading
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../src/messages/${locale}.json`)).default,
  };
});
```

The i18n implementation provides:

1. **Server-side rendering** of translated content improves SEO
2. **Locale-specific URLs** for better user experience
3. **Message separation** for easier translation management
4. **Dynamic loading** of translation files only when needed

## Areas for Improvement

- **Advanced Search Options**: Implement additional filtering criteria for job searches
- **Saved Searches**: Allow users to save and manage their frequent searches
- **Automated Testing**: Implement E2E and component tests with Playwright and Vitest

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Alternatively, you can access the live application [here](https://library.teeldinho.co.za/).

## Screenshots

![Job Search - Hero](public/desktop-hero-2.png)
![Job Search - English](public/desktop-english.png)
![Job Search - Spanish](public/desktop-spanish.png)
![Job Search - French](public/desktop-french.png)
![Job Search - English](public/mobile-english.png)
![Job Search - French](public/mobile-french.png)

## Conclusion

This project demonstrates how separating UI from logic through headless components creates a more maintainable and flexible application. By leveraging modern React patterns, Next.js capabilities, and TypeScript's type safety, the implementation achieves a balance between developer experience and end-user performance.

The approach taken provides a foundation that can easily scale to more complex requirements while maintaining code quality and component reusability across the application.
