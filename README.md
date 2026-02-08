# Kiaboard

A modern HR task management dashboard built with React and TypeScript.

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** (React Query) - Server state management
- **TanStack Table** (React Table) - Data tables
- **Tailwind CSS 4** - Styling
- **i18next** - Internationalization
- **date-fns** - Date formatting
- **ShadcnUI** - Accessible UI primitives
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Testing

- **Jest** - Unit and component testing
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd kiaboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Running Tests

### Unit Tests

Run all unit tests (functions, utilities):

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

### Component Tests

Component tests are included in the main test suite:

```bash
npm test
```

### E2E Tests (Playwright)

Run all end-to-end tests in headless mode:

```bash
npm run test:e2e
```

Run with browser UI visible:

```bash
npm run test:e2e:headed
```

Run with Playwright UI mode (interactive):

```bash
npm run test:e2e:ui
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run unit and component tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run Playwright E2E tests (headless)
- `npm run test:e2e:headed` - Run E2E tests with browser visible
- `npm run test:e2e:ui` - Run E2E tests in interactive UI mode

## Project Structure

```
kiaboard/
├── src/
│   ├── api/              # API client functions
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts (Theme, Language, Tasks)
│   ├── features/         # Feature-specific components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   ├── locales/          # i18n translations
│   ├── pages/            # Page components
│   └── styles/           # Global styles
├── tests/
│   ├── unit/             # Unit tests
│   ├── component/        # Component tests
│   └── e2e/              # Playwright E2E tests
└── public/               # Static assets
```

## Features

- Task management with CRUD operations using react query
- Dark/Light theme toggle
- Multi-language support (i18n)
- Responsive design
- Data tables with sorting and filtering using react table
- Search functionality
