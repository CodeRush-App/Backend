# CodeRush Backend

## Setup

1. Set environment variables (see `.env.example`).
2. Run the production server:
   ```bash
   npm start
   ```

## Scripts

- `npm run build` - Build production server
- `npm run prepare:prod` - Prepare production server
- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Linting & Formatting

- ESLint config: `eslint.config.js`
- Prettier config: `.prettierrc`

## API Documentation

- Swagger UI available at `/api-docs` when running

## Environment Variables

- See `.env.example` or `src/config/env.ts` for required variables

## Project Structure

- `src/config` - Configuration files
- `src/controllers` - Route handlers
- `src/services` - Business logic
- `src/routes` - Express routers
- `src/middleware` - Express middleware
- `src/validators` - Joi validation schemas
- `src/types` - Custom types
- `src/utils` - Utilities
- `prisma` - Prisma schema and migrations

## Database

- Uses Prisma ORM
- Configure database in `.env`

---

For more details, see inline code comments and Swagger API docs.
