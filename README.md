# LifeScape

LifeScape is a tracker of life decisions visualized as a personal digital city. Each decision is represented by a building on a street within a district. The project consists of two main parts:

- **/api** – backend built with NestJS, Prisma and PostgreSQL
- **/client** – frontend built with Next.js

The whole system runs with `docker-compose`.

Copy `.env.example` to `.env` and adjust the values before running the stack.

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

The API will be available on `http://localhost:4000` with Swagger docs at `http://localhost:4000/docs`.
The frontend will be served on `http://localhost:3000`.

## Authentication

User accounts are managed by the API. To register send a `POST /auth/register` request with `email` and `password`.
The service logs a confirmation code to the API console. Confirm the email by sending this code to `POST /auth/confirm-email`.

Once verified you can log in using `POST /auth/login` which returns a JWT access token. The same token is returned when logging in with Google via `POST /auth/google`.

Authenticated endpoints require the bearer token in the `Authorization` header. Profile information can be retrieved with `GET /users/me` and updated with `PATCH /users/me`.

The confirmation code printed in the API logs is the only place where it is shown, so check your terminal output after registration.

## Creating your city

Once authenticated you can start building the digital city. First create a district with `POST /districts` providing the district name. For each district you can create streets via `POST /streets` and by specifying the `districtId` received earlier.

Every decision is created with `POST /decisions` where you send the `streetId` it belongs to and whether it is positive (`isPositive: true` or `false`). Buildings are created via `POST /buildings` and reference both the `streetId` and the `decisionId`. A building also stores `visualState` which describes how the decision is visualised: `good`, `bad` or `neutral`.

Deleting a district with `DELETE /districts/:id` will automatically remove all related streets, buildings and decisions.

