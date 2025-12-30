# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Type check and build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm preview
```

## Architecture Overview

### Application Structure

This is a React + TypeScript + Vite application with two distinct user flows:

1. **Order Flow** (`/order/*`): Multi-step form for ordering LEGO sets
2. **Build Flow** (`/build/*`): Interactive LEGO building experience with animations

### Routing Architecture

The app uses nested routing with React Router:

- **App.tsx**: Top-level routes (`/`, `/order/*`, `/build/*`)
- **OrderFlow.tsx**: Nested routes for order steps (`step-1` through `step-5`, `confirmation`)
- **BuildFlow.tsx**: Nested routes for build experience (`/`, `step/:stepId`, `instruction/:stepId`)

Each flow component uses `<Routes>` to define its nested routes, following the pattern:
```tsx
<Route path="order/*" element={<OrderFlow />} />
  // Inside OrderFlow:
  <Route path="step-1" element={<OrderStep1 />} />
```

### State Management

Uses **Zustand** with persistence middleware (localStorage):

- **buildStore.ts**: Manages build flow state
  - Current step, completed steps, answers
  - Selected brick color (from 5 color palettes)
  - Gallery photos
  - Music state
  - Persisted as `edgar-build-storage`

- **orderStore.ts**: Manages order flow state
  - User data (name, email, company, etc.)
  - Current step navigation
  - Order submission (EmailJS integration placeholder)
  - Persisted as `edgar-order-storage`

Both stores use the `persist` middleware pattern:
```typescript
export const useStore = create<Store>()(
  persist(
    (set, get) => ({ /* state and actions */ }),
    { name: 'storage-key' }
  )
);
```

### Brick Color System

The app supports 5 brick color palettes defined in `buildStore.ts`:
- **Baddy Blue** (default)
- **Wine**
- **Sunshine**
- **Rojo**
- **Coal**

Each palette has 4 shades:
- `primary`: Main face color
- `secondary`: Side/shadow color
- `tertiary`: Dark side color
- `highlight`: Top/stud highlight

### Brick Components

Located in `src/components/bricks/`, these are SVG-based React components that accept a `colorPalette` prop:

```typescript
interface BrickProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}
```

The components use the palette colors to dynamically style SVG paths, defaulting to Baddy Blue if no palette is provided. Available brick types: `1x2`, `2x1`, `2x2`, `3x1`, `4x1`, `4x2`, `6x1`.

### Build Step Configuration

Build steps are configured in `src/data/buildSteps.ts` as an array of `BuildStep` objects:

```typescript
interface BuildStep {
  id: number;
  type: 'build' | 'question' | 'video';
  content: BuildStepContent | QuestionStepContent | VideoStepContent;
}
```

The `instructionConfigs.ts` file contains detailed brick positioning, animations, and rendering configurations for each instruction step.

### Form Validation

Uses React Hook Form + Zod for type-safe form validation. Forms are located in `src/pages/order/OrderStep*.tsx` and follow this pattern:

- Define Zod schema for validation
- Use `useForm` hook with `zodResolver`
- Call `setUserData` from orderStore on successful validation
- Navigate to next step

### Type System

Key types defined in `src/types/index.ts`:

- **OrderData**: Form data structure
- **BuildStep**: Union type for different step types
- **Brick**: Animation and positioning data for individual bricks
- **GalleryPhoto**: Photo capture metadata
- **Industry/Position**: Enum-like types for form options

### Question Generation

`src/utils/questionGenerator.ts` contains logic for generating personalized questions based on user's industry and position from the order flow. Questions are injected into the build flow as `question` type steps.

## Key Patterns

### 100svh Layout Pattern

Many screens use a fixed viewport height pattern to prevent scrolling:

```css
.container {
  height: 100svh;
  overflow: hidden;
}

.scrollable-content {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}
```

This ensures the main container fits the viewport while internal sections can scroll.

### Navigation Between Flows

Build steps navigate using step indices and check if the next index is beyond the array length to determine completion. Order steps navigate using named routes (`step-1`, `step-2`, etc.).

### Asset Organization

- Images: `src/assets/images/`
- Videos: `src/assets/videos/` (placeholder)
- Audio: `src/assets/audio/` (placeholder)
- Brick components: `src/components/bricks/`

## Important Constraints

- **Mobile-first**: Design system uses responsive breakpoints (30em, 40em, 48em, 64em, 90em)
- **Background color**: Primary background is `#fefff8` (off-white)
- **100svh requirement**: Pages must fit within viewport height with no page-level scrolling
- **Persistent state**: Both stores persist to localStorage, so changes survive page refreshes
- **EmailJS integration**: Order submission currently uses placeholder code; requires EmailJS configuration

## Common Modifications

### Adding a new build step:
1. Add step to `buildSteps` array in `src/data/buildSteps.ts`
2. If it's an instruction step, add configuration to `instructionConfigs.ts`
3. Update navigation logic if adding new step types

### Adding a new brick color:
1. Add to `BrickColorName` type in `buildStore.ts`
2. Add palette definition to `brickColorPalettes` object
3. Add corresponding brick SVG assets if needed

### Modifying order form:
1. Update OrderData type in `src/types/index.ts`
2. Update Zod schema in the relevant OrderStep component
3. Update orderStore if adding new fields
4. Update EmailJS template if configured
