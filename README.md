# Marvel Character Explorer

## Visit Site

This is a [Project Example](https://marvelous-explorer.vercel.app/) running on vercel.

## Description

Marvel Character Explorer is a Next.js application that allows users to browse and learn more about their favorite Marvel characters and comics. Utilizing the Marvel Comics API, this app presents a list of characters, their details, and associated comics in a user-friendly interface.

## Features

- Character Listing: Browse a list of Marvel characters.
- Character Search: Find characters using the search functionality.
- Favorites: Mark characters as favorites and view them separately.
- Comic Carousel: Explore comics related to each character.

## Technology Stack

- Next.js: For server-side rendering and static generation.
- React: For building the user interface.
- Tailwind CSS: For styling components.
- Redux Toolkit: For state management.
- Vercel: For deployment and hosting.

## Project Structure

```bash
/project-root
    /public - Static files like images.
    /components - Reusable UI components.
    /pages - Application pages including the home page (page.tsx).
    /function - fetch data from API.
    /styles - Global styles and Tailwind configuration.
    /hooks - Custom React hooks.
    /state - Redux store and slices.
    /types - TypeScript type definitions.
```

## Getting Started

### Prerequisites

- Node.js (version 12 or later)
- npm/yarn

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/marvel-character-explorer.git
```

## Navigate to the project directory:

```bash
cd marvel-character-explorer
```

Config your .env.local , look at the example path: /.env.example

Install the packages:

```bash
npm install
# or
yarn
```

Development Mode:
Running Development Mode: Execute npm run dev or yarn dev in your terminal. This command starts the development server.
Behavior: Assets are not minimized. Source maps are available. Hot reloading enables instant updates during code changes.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production Mode:
Building for Production: Execute npm run build or yarn build. This command builds the application for production usage.
Starting Production Server: After building, start your application in production mode with npm start or yarn start.
Behavior: Assets are automatically minimized and optimized by Next.js. This includes CSS, JavaScript, and images through automatic image optimization when using the next/image component.

```bash
npm run build
npm run start
# or
yarn buid
yarn start
```

## Deployment

This project is set up to be easily deployed on Vercel, enabling automatic builds and deployments. Follow the Vercel deployment documentation for detailed instructions.

## Contributing

Contributions are welcome! Please read our Contributing Guide for details on our code of conduct and the process for submitting pull requests to us.

## Acknowledgments

- Marvel Comics API for providing character data.
- Next.js and Vercel team for the amazing framework and deployment solutions.
- The Tailwind CSS team for the utility-first CSS framework.
