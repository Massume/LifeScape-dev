# LifeScape

LifeScape is a tracker of life decisions visualized as a personal digital city. Each decision is represented by a building on a street within a district. The project consists of two main parts:

- **/api** – backend built with NestJS, Prisma and PostgreSQL
- **/client** – frontend built with Next.js

The whole system runs with `docker-compose`.

After starting the database service you can run API migrations and the seed script:

```bash
cd api
npm run prisma:migrate
npm run prisma:seed
```

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

## Authentication

User accounts are managed by the API. To register send a `POST /auth/register` request with `email` and `password`.
The service logs a confirmation code to the API console. Confirm the email by sending this code to `POST /auth/confirm-email`.

Once verified you can log in using `POST /auth/login` which returns a JWT access token. The same token is returned when logging in with Google via `POST /auth/google`.

Authenticated endpoints require the bearer token in the `Authorization` header. Profile information can be retrieved with `GET /users/me` and updated with `PATCH /users/me`.

The confirmation code printed in the API logs is the only place where it is shown, so check your terminal output after registration.

