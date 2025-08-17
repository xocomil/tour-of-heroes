# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern Angular 20+ application built with the Nx monorepo framework, implementing a "Tour of Heroes" demo using the latest Angular features including standalone components, signals, and NgRx Signal Store. The project demonstrates a clean architectural separation between application code, shared UI components, and state management.

## Architecture

### Monorepo Structure
- **apps/tour-of-heroes/** - Main Angular application with SSR support
- **apps/tour-of-heroes-e2e/** - Playwright e2e tests
- **libs/ui/** - Shared UI components and presentational logic  
- **libs/state/** - State management stores and models using NgRx Signal Store

### State Management
The application uses **NgRx Signal Store** with signals-based reactivity:
- `@toh/state` - Contains `MessageStore` for application-wide messaging
- `@toh/ui` - Contains `HeroesStore` for hero management with immutable updates via `mutative`
- Event-driven communication between stores using `@ngrx/signals/events`

### Key Technologies
- **Angular 20+** - Standalone components, signals, control flow syntax (@if, @for)
- **Nx 21+** - Monorepo tooling, project management, and task execution  
- **NgRx Signal Store** - Modern state management with signals
- **TailwindCSS + DaisyUI** - Styling with utility classes and component library
- **Jest** - Unit testing framework
- **Playwright** - End-to-end testing
- **pnpm** - Package manager

## Development Commands

### Core Development
```bash
# Start development server
npx nx serve tour-of-heroes

# Build for production
npx nx build tour-of-heroes

# Build for development (with source maps)
npx nx build tour-of-heroes --configuration=development
```

### Testing
```bash
# Run unit tests for all projects
npx nx test

# Run tests for specific project
npx nx test tour-of-heroes
npx nx test ui
npx nx test state

# Run tests with coverage
npx nx test tour-of-heroes --configuration=ci

# Run e2e tests
npx nx e2e tour-of-heroes-e2e
```

### Code Quality
```bash
# Lint all projects
npx nx lint

# Lint specific project
npx nx lint tour-of-heroes

# Format code with Prettier
npx nx format

# Check for affected projects (useful in CI)
npx nx affected:test
npx nx affected:lint
npx nx affected:build
```

### Project Management
```bash
# View project dependencies and structure
npx nx graph

# Show available tasks for a project
npx nx show project tour-of-heroes

# List all projects
npx nx show projects

# Generate new Angular components/services
npx nx g @nx/angular:component my-component --project=ui
npx nx g @nx/angular:service my-service --project=state
```

### Build Analysis
```bash
# Serve built application statically
npx nx serve-static tour-of-heroes

# Extract i18n messages
npx nx extract-i18n tour-of-heroes
```

## Library Architecture

### @toh/ui Library
Contains all UI components following a container/presentational pattern:
- `HeroesComponent` - Main container orchestrating hero list and detail views
- `HeroesListComponent` - Displays selectable list of heroes
- `HeroDetailComponent` - Shows and edits selected hero details  
- `MessageComponent` - Displays system messages

### @toh/state Library  
Manages application state with NgRx Signal Store:
- `MessageStore` - Global message logging with event-driven updates
- `HeroesStore` - Hero data management with immutable state updates
- Models and utilities for type-safe state operations

## TypeScript Path Mapping
The project uses path aliases defined in `tsconfig.base.json`:
- `@toh/state` → `libs/state/src/index.ts`
- `@toh/ui` → `libs/ui/src/index.ts`

## Development Notes

### Signal Store Patterns
- Stores use `withImmutableState` and `mutative` for safe state updates
- Event-driven communication between stores using `injectDispatch`
- Computed signals for derived state calculations
- RxJS methods (`rxMethod`) for handling async operations with debouncing

### Component Patterns  
- Standalone components with explicit imports
- OnPush change detection for optimal performance
- Signal-based reactivity throughout the application
- DaisyUI component classes for consistent styling

### Testing Structure
- Jest configuration for unit tests with Angular-specific setup
- Playwright for comprehensive e2e testing
- Component tests use TestBed with standalone component imports
