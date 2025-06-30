# LifeScape API

This service is built with [NestJS](https://nestjs.com/) and [Prisma](https://prisma.io).

## Development

```bash
npm install
npm run start:dev
```

### Database migrations

Run pending migrations:

```bash
npm run prisma:migrate
```

Create new migration during development:

```bash
npm run prisma:migrate-dev --name <name>
```

### Seed database

Execute seed script (after running migrations):

```bash
npm run prisma:seed
```

The default database connection is configured in `.env`.
