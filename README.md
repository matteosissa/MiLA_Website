# MiLA Website Repository

**Live Website:** [https://mila-website-frontend.vercel.app](https://mila-website-frontend.vercel.app)

MiLA is a (hypothetical) support centre for women and children victim of violence basesd in Milan. It offers comprehensive range of services and initiatives, with the goal of improving women’ situations and empowering them for a better future.

Primary objectives:

1. **Immediate Assistance**: providing immediate support for women and children in difficult situations
2. **Empowerment Tools**: offering tools and opportunities to help women improve their lives and achieve lasting happiness
3. **Enhanced Accessibility**: widening the reach of support and improving service accessibility

## Documentation

Under the folder `project_description/` it is possible to find the set of requirements for this project, while the folder `reports/` contains the documentation produced at the end of this project describing in detail the design and technological aspects.

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


### Project Structure

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


### Prerequisites

- Node.js (v18 or higher)

- npm or yarn

1. Clone the repository and navigate to the project directory:

    ```bash

    git clone https://github.com/matteosissa/MiLA_Website.git
    cd MiLA_Website

    ```

2. Install dependencies:

    ```bash

    npm install

    yarn install

    ```

3. Set up environment variables (create a `.env` file in the root directory):

    ```env

    OPENAI_API_KEY=your_openai_api_key

    BASE_BACKEND_URL=your_backend_api_url

    ```

4. Start the development server on `http://localhost:3000`:

    ```bash

    npm run dev

    yarn dev

    ```

## Deployment

The frontend is deployed on [Vercel](https://vercel.com) with automatic deployments on push to the `master` branch via GitHub Actions.

## Contact

For any questions or support, please contact us at:

- **Email**: centromila@gmail.com
- **Phone**: 0521 248886
- **Emergency Hotline**: 1522 (anti-violence centres) or 112 (police)

We appreciate your support and thank you for being a part of MiLA's mission.
