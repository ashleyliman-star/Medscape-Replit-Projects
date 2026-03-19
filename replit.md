# Medical Debates Platform

## Overview

This is a full-stack web application for presenting medical debates with expert opinions. The platform showcases evidence-based arguments from healthcare professionals on controversial medical topics, allowing users to explore different perspectives and participate in polls.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Analytics**: Google Analytics integration for user tracking

### Backend Architecture
- **Runtime**: Node.js 20 with TypeScript
- **Framework**: Express.js for RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development**: Hot module replacement with Vite middleware in development

## Key Components

### Database Layer
- **Schema**: Defined in `shared/schema.ts` with Drizzle ORM
- **Tables**: 
  - `users` - User authentication data
  - `poll_responses` - Debate poll submissions
- **Validation**: Zod schemas for type-safe data validation
- **Connection**: Neon Database serverless PostgreSQL

### API Layer
- **Poll Endpoints**: 
  - `POST /api/poll` - Submit poll responses
  - `GET /api/poll/:debateId/stats` - Retrieve poll statistics
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development

### Frontend Components
- **Debate Layout**: Multiple layout variants (A, B, D, E) for A/B testing
- **Argument Display**: Accordion-style expandable arguments
- **Poll System**: Interactive voting with real-time results
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### UI/UX Features
- **Design System**: Consistent theming with CSS custom properties
- **Accessibility**: ARIA labels and semantic HTML structure
- **Performance**: Code splitting and lazy loading
- **Animation**: Framer Motion for smooth interactions

## Data Flow

1. **Content Delivery**: Static debate content is embedded in React components
2. **User Interaction**: Poll submissions trigger API calls to Express backend
3. **Data Persistence**: Poll responses stored in PostgreSQL via Drizzle ORM
4. **Real-time Updates**: Poll statistics fetched and displayed after voting
5. **Analytics**: User interactions tracked via Google Analytics

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production server
- **drizzle-kit**: Database migration and introspection tools

### Analytics Integration
- **Google Analytics**: Requires `VITE_GA_MEASUREMENT_ID` environment variable
- **Event Tracking**: Custom events for user interactions

## Deployment Strategy

### Containerization
- **Dockerfile**: Multi-stage build (node:18-alpine), port 5000, built-in HEALTHCHECK
- **docker-compose.yml**: Service definition with DATABASE_URL env var
- **.dockerignore**: Excludes node_modules, .git, etc.
- **kubeconfig.json**: Kubernetes config with `appid: medscape-debates`, `containerport: "5000"`, `liveprobe: /health`
- **.gitlab-ci.yml**: CI/CD pipeline configuration

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `npm run db:push`
4. **Docker**: `docker build` produces production image with `npm ci --omit=dev`

### Environment Configuration
- **Development**: `npm run dev` - TSX with hot reload
- **Production**: `npm run start` - Node.js with built assets
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Health Check**: `GET /health` returns `{"status":"healthy"}` (HTTP 200)

### Third-Party Script Gating
- Adobe DTM launch tag, medscapeads.js, Hotjar, PulsePoint pixel, and Meta pixel only load on production domains (`medscape.com`, `webmd.com`)
- Dev environments use `window.__medscapeIsDev = true` flag to skip these scripts
- Detection is domain-based (not hostname-based) to work across any dev environment

### Hosting Requirements
- **Node.js 18+**: Server runtime (Alpine-based Docker image)
- **PostgreSQL 16**: Database backend (via DATABASE_URL)
- **Static Assets**: Served via Express in production
- **Port**: 5000 (configurable via PORT env var)

## Changelog

- August 18, 2025: Updated "What to Read Next on Medscape" section with five aortic stenosis-focused articles and new tracking parameters (ecd=dir_mscp_020925_icd_cardiodebate_position1-5)
- August 18, 2025: Transformed poll system to three-option aortic stenosis debate: TAVR/SAVR, SAVR favored, clinical surveillance with pie chart visualization
- August 18, 2025: Updated all references to seven current aortic stenosis trials and guidelines (AVATAR, EVOLVED, EARLY TAVR, etc.)
- August 18, 2025: Completed comprehensive content transformation from cancer surveillance to aortic stenosis early intervention debate
- July 10, 2025: Added GA click tracking for mobile "read more/read less" buttons (read_more_click and read_less_click events)
- July 10, 2025: Updated all ad unit links to use new house campaign tracking codes (ecd=house-X_ICD_cancerdebate)
- July 10, 2025: Updated "What to Read Next on Medscape" section links to use Pulse Point tracking parameters (ecd=ppc_pulsepoint_250709_icd_cancerdebate_position1-5)
- July 9, 2025: Enhanced Pulse Point pixel with privacy compliance parameters (us_privacy, GPP_STRING, GPP_SID)
- July 9, 2025: Added detailed console logging for Adobe Analytics initialization and verification
- July 9, 2025: Implemented comprehensive GA click tracking for ad units with position-specific and device-specific labels (medscape_ad_click events)
- July 9, 2025: Completed comprehensive Medscape Masters alcohol campaign integration with all seven mobile ad units filled with unique 300x250 creatives and proper click tracking
- July 9, 2025: Added "Advertisement" labels below all ad units for both mobile and desktop compliance
- July 9, 2025: Optimized mobile ad positioning with sequential numbering (1-7) matching visual order from top to bottom
- July 9, 2025: Built comprehensive privacy preference center with three tabs (Your Privacy, Strictly Necessary Cookies, Privacy Preference Center) featuring functional cookie toggles, localStorage persistence, and OneTrust integration
- July 8, 2025: Implemented admin system with password protection (medscape/ICDTeam909) for comment management
- July 8, 2025: Improved desktop text alignment - supporting text now aligns with argument titles
- July 8, 2025: Optimized mobile argument boxes - reduced spacing and font sizes for better mobile experience
- July 8, 2025: Updated Hotjar tracking code to new ID (930685) for Medscape Debates Cancer project
- July 8, 2025: Updated page metadata with proper title, description, and Open Graph tags for social sharing
- July 8, 2025: Added engaging opening line "Is it time to rethink routine surveillance?" to introduction
- July 8, 2025: Added Medscape favicon to replace default browser icon
- June 25, 2025: Archived versions A, B, and D (C2) - code preserved in comments for future use
- June 25, 2025: Version C1 (E) is now the only active version with optimized mobile ad placements
- June 23, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.