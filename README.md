### Table of contents
- [What is This?](#what-is-this)
- [Live](#live)
- [Demo](#demo)
- [Core Features](#core-features)
- [Additional Features](#additional-features)
- [Folder Structure \& Organization](#folder-structure--organization)
- [Getting Started (run it)](#getting-started-run-it)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
---

## What is This?
This project is the implementation of the Code Quests task for the development consulting firm, BOD. It is built using a feature-based architecture.

## Live
🎥 [Check the website live here](https://adaa-eight.vercel.app/)

## Demo
🎥 [Watch the demo video here](https://mukhtasar.pro/abdelrahman-demo)

## Core Features
- **Authentication** 
  - User signup, login, and logout
  - Session-based authentication with Redis
  - Full input validation on both frontend and backend using Zod schemas
- **Products**: 
   - Responsive, well-structured product list with Tanstack table
   - Pagination and adjustable page size 
   - Full-text search across product name and description
   - Add products with complete validation
   - Delete products with confirmation modal
   - Edit product details (name, stock, status, description, price, etc.)

## Additional Features
- **Vercel performance/analytics Integration**
  - Observability and Real user monitoring with Vercel
- **API documentation With Swagger**: https://products-repo.onrender.com/docs


## Folder Structure & Organization
- Reusable, decoupled features that can be dragged and reused elsewhere easily
- Separation of concerns and logic
  - app directory handles only the routing
  - features: holds all the logic
    - API calls under service layer
    - feature-specific Components under feature components directory (features/feature-name/components)
    - Schema under schema directory (features/feature-name/schema), etc.
```
    public/                    # Static assets
    src/                       # All Logic here
    ├── app/                   # Only the end pages logic
    │   ├── auth/              # Folder: Authentication pages (e.g. signup, login)
    │   │   ├── layout.tsx     # Layout: Shared layout between the authentication pages
    │   │   └── /login/         # Login route
    │   │        └── /page.tsx         
    │   │   └── /signup/        # signup route    
    │   │        └── /page.tsx 
    │   ├── dashboard/        # Authenticated Protected dashboard pages
    │   │   ├── layout.tsx    # Layout: Shared layout between the dashboard pages
    │   │   └── products/     # Dashboard Products routes
    │   │        └── /page.tsx
    │   ├── globals.css       # Global styles
    │   ├── layout.tsx        # Root layout
    │   ├── page.tsx          # Home page (redirects to dashboard or login pages)
    │   ├── error.tsx         # Global error UI
    │   └── not-found.tsx     # 404 page
    │
    ├── components/           # Shared/reusable components
    │   ├── ui/               # Base UI components
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── ...
    │   ├── data-table/      # Reusable data table components
    │   ├── sidebar/         # Sidebar-related components
    │
    ├── features/            # Feature modules organized by business domain
    │   ├── auth/              # Authentication Feature components/hooks/service/validation schemas/etc.
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── service/
    │   │   ├── schema/
    │   │   ├── types/
    │   ├── products/            # Products Feature components/hooks/service/validation schemas/etc.
    │  
    ├── lib/                 # Shared utilities and libraries
    │   └── api-client.ts    # HTTP client 
    │ 
    ├── hooks/               # Global/shared hooks
    │  
    ├── context/             # Global context providers
    │   └── client-provider.tsx
    └── fonts.ts             # Font configurations
```

**Feature-Based Organization**

Each business feature (e.g. Auth, Products, etc.) is self-contained with its own:
- `components/` → feature-specific UI components
- `service/` → feature-specific API calls
- `hooks/` → feature-specific Hooks (mainly, React Query wrappers around services)
- `context/` → feature-specific context


## Getting Started (run it)
Follow these steps to run the project locally:

1. **Clone the Repository**
    ```bash
    git clone git@github.com:abdoemadselim/BDO-Code-Quest.git
    cd BDO-Code-Quest 
    ```

2. **Install Dependencies**
   ```bash
   pnpm install 
   ```
   Or if you prefer npm
   ```bash
   npm install
   ```
3. **Rename env-example file to .env**

      note: This is surly not valid for real projects :)
   
5.  **Start The project in dev mode**
    ```bash
    pnpm dev
    ```
    Or build and preview it in a production-like environment
    ```bash
    pnpm build
    ```
    then
    ```bash
    pnpm start
    ```

## API Endpoints
I use my own backend to serve the required functionality and data to the interface

the backend is deployed on a render platform instance: https://products-repo.onrender.com

You can check the swagger documentation here to see and test all endpoints: https://products-repo.onrender.com/docs

- **Products Resource**
  - GET /products --> Get products pages with support for the following query params
    - ?page=[pageIndex]
    - ?pageSize=[pageSize]
    - ?search=[searchTerm]
  - GET /products/status --> Get all available products status (متاح - غير متوفر - قريباً - ألخ) (used for product creation/update forms)
  - DELETE /products/:product_id --> Delete a product given the id
  - POST /products --> Create a new product
  - PATCH /products/:product_id --> Update a product given the id and changed fields
- **Auth Resource**
  - POST /auth/login --> Login request
  - POST /auth/signup --> Create a new user request
  - POST /auth/logout --> Logout
  - GET /auth/me --> Verify if user is still authenticated (sent for each user request)
- **Categories Resource**
  - GET /categories --> Get all available categories (used for product creation/update forms)
  
## Tech Stack
- React (Next.js framework for file-based routing)
- TailwindCSS (for faster, composable styling)
- ShadCN (for Prebuilt, accessible, and customizable UI components out of the box)
- React Query (for server-side state handling/caching)
- Tanstack Table (for providing fully-fledged tables with pagination, searching, etc.)
- Context API (Global state management for authentication)
- Typescript (for better developer experience)