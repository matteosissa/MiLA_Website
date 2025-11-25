# MiLA Website Repository

**Live Website:** [https://mila-website-frontend.vercel.app](https://mila-website-frontend.vercel.app)

MiLA is a (hypothetical) support centre for women and children victim of violence basesd in Milan. It offers comprehensive range of services and initiatives, with the goal of improving women’ situations and empowering them for a better future.

Primary objectives:

1. **Immediate Assistance**: providing immediate support for women and children in difficult situations
2. **Empowerment Tools**: offering tools and opportunities to help women improve their lives and achieve lasting happiness
3. **Enhanced Accessibility**: widening the reach of support and improving service accessibility

## Technical Stack

### Three-Tier Architecture

The MiLA project follows a three-tier architecture:

1. **Frontend (Presentation Layer)** - *This Repository*

   - Framework: [Nuxt 3](https://nuxt.com/) (Vue.js framework)
   - Deployment: Vercel
   - URL: [https://mila-website-frontend.vercel.app](https://mila-website-frontend.vercel.app)

2. **Backend (Application Layer)**

   - Runtime: Node.js
   - Framework: Express.js
   - API endpoints for services, projects, people, and locations
  
3. **Data Layer**

   - Database: [Supabase](https://supabase.com/) (PostgreSQL)
   - Storage: Supabase Storage for images and media


## Project Structure

```text

├── assets/               # Static assets (images, styles)
├── components/          # Vue components
│   ├── buttons/         # Button components
│   ├── cards/           # Card components# npm
│   ├── chatbot/         # Chatbot UI components
│   ├── global/          # Global/shared components (icons, etc.)
│   └── header/          # Header and navigation components
├── layouts/             # Nuxt layouts  
│   └── default.vue      # Default layout with header and footer
├── pages/               # File-based routing   - Framework: Express.jsyarn dev
    ├── index.vue        # Homepage
    ├── contacts.vue     # Contact page 
    ├── about-us/        # About Us section
    │   ├── index.vue
    │   ├── locations.vue
    │   └── people/
    ├── activities/      # Activities section
    │   ├── index.vue 
    │   ├── projects/
    │   └── services/  
    └── what-you-can-do/ # Support section
        ├── donate.vue
        └── volunteering.vue
```


### Prerequisites## Project Structure



- Node.js (v18 or higher)```

- npm or yarn

├── assets/               # Static assets (images, styles)

### Installation│   ├── images/          # Image files

│   └── styles/          # Global CSS

1. Clone the repository and navigate to the project directory:├── components/          # Vue components

│   ├── buttons/         # Button components

```bash│   ├── cards/           # Card components

git clone https://github.com/matteosissa/MiLA_Website.git│   ├── chatbot/         # Chatbot UI components

cd MiLA_Website│   ├── global/          # Global/shared components (icons, etc.)

```│   └── header/          # Header and navigation components

├── layouts/             # Nuxt layouts

2. Install dependencies:│   └── default.vue      # Default layout with header and footer

├── pages/               # File-based routing

```bash│   ├── index.vue        # Homepage

# npm│   ├── contacts.vue     # Contact page

npm install│   ├── about-us/        # About Us section

│   │   ├── index.vue

# yarn│   │   ├── locations.vue

yarn install│   │   └── people/

```│   ├── activities/      # Activities section

│   │   ├── index.vue

3. Set up environment variables (create a `.env` file in the root directory):│   │   ├── projects/

│   │   └── services/

```env│   └── what-you-can-do/ # Support section

OPENAI_API_KEY=your_openai_api_key│       ├── donate.vue

BASE_BACKEND_URL=your_backend_api_url│       └── volunteering.vue

```├── plugins/             # Nuxt plugins

├── types/               # TypeScript type definitions

4. Start the development server on `http://localhost:3000`:├── nuxt.config.ts       # Nuxt configuration

├── package.json         # Dependencies

```bash└── tsconfig.json        # TypeScript configuration

# npm```

npm run dev

## Getting Started

# yarn

yarn dev### Prerequisites

```- Node.js (v18 or higher)

- npm or yarn

### Build for Production

### Installation

```bash1. Clone the repository and navigate to the project directory:

# Generate static site```bash

npm run generategit clone https://github.com/matteosissa/MiLA_Website.git

cd MiLA_Website

# Build for SSR```

npm run build

2. Install dependencies:

# Preview production build```bash

npm run preview# npm

```npm install



## Deployment# yarn

yarn install

The frontend is deployed on [Vercel](https://vercel.com) with automatic deployments on push to the `master` branch via GitHub Actions.```



## Contact3. Set up environment variables:

Create a `.env` file in the root directory with:

For any questions or support, please contact us at:```env

OPENAI_API_KEY=your_openai_api_key

- **Email**: centromila@gmail.comBASE_BACKEND_URL=your_backend_api_url

- **Phone**: 0521 248886```

- **Emergency Hotline**: 1522 (anti-violence centres) or 112 (police)

4. Start the development server on `http://localhost:3000`:

We appreciate your support and thank you for being a part of MiLA's mission.```bash

# npm
npm run dev

# yarn
yarn dev
```

### Build for Production
```bash
# Generate static site
npm run generate

# Build for SSR
npm run build

# Preview production build
npm run preview
```

## Deployment
The frontend is deployed on [Vercel](https://vercel.com) with automatic deployments on push to the `master` branch via GitHub Actions.

## Contact
For any questions or support, please contact us at:
- **Email**: centromila@gmail.com
- **Phone**: 0521 248886
- **Emergency Hotline**: 1522 (anti-violence centres) or 112 (police)

We appreciate your support and thank you for being a part of MiLA's mission.
