# Google Review QR Code Generator

## Overview

This project is a web application that generates QR codes for Google Reviews.

## Features

- Search for businesses by name
- Generate QR codes linking to Google Review pages
- Responsive design using Tailwind CSS and DaisyUI
- Server-side web scraping using Puppeteer

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- DaisyUI
- Puppeteer
- @sparticuz/chromium-min

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Set `CHROME_EXECUTABLE_PATH` to your local Chrome installation path
4. Run the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

1. Build the application:

   ```sh
   npm run build
   ```

2. Run the production server:

   ```sh
   npm run start
   ```

## Project Structure

- `src/app/page.tsx`: Main application page
- `src/app/api/scraper/route.ts`: API route for web scraping
- `src/app/layout.tsx`: Root layout component
- `src/app/globals.css`: Global styles

## Notes

- The web scraping functionality is designed to work in both local and
  serverless environments

## License

This project is part of a code challenge and is not licensed for public use or
distribution.
