# Developing Mach10

## Frontend

### Setup

Make sure to install the dependencies:

```bash
yarn install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Backend

### Setup

See https://supabase.com/docs/guides/cli/local-development

### Generate Typescript

```bash
supabase gen types typescript --local > types/database.types.ts
```

### Generate migration

```bash
supabase db diff --use-migra -f MIGRATION_NAME
```