# LifeScape

LifeScape is a tracker of life decisions visualized as a personal digital city. Each decision is represented by a building on a street within a district. The project consists of two main parts:

- **/api** – backend built with NestJS, Prisma and PostgreSQL
- **/client** – frontend built with Next.js

The whole system runs with `docker-compose`.

## Technology Stack

- Node.js
- NestJS
- Prisma
- PostgreSQL
- Next.js
- Docker & docker-compose

## Running with Docker Compose

```bash
docker-compose up --build
```

The API will be available on `http://localhost:3000` and the frontend on `http://localhost:3001` (ports can be adjusted in `docker-compose.yml`).

