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

## Architecture

The project uses a classic three-service setup managed by **docker-compose**:

```
┌─────────┐      ┌────────┐      ┌─────────┐
│ client  │◄────►│  api   │◄────►│ database│
└─────────┘      └────────┘      └─────────┘
```

The backend exposes a REST API written with **NestJS** and uses **Prisma** to
communicate with a PostgreSQL database. The frontend is a **Next.js** app that
interacts with the API via HTTP requests.

## Database schema

```
User 1 ──< District 1 ──< Street 1 ──< Building
  │                │                └── Decision 1
  └──< Decision >──┘
```

Each **user** owns multiple districts and decisions. A district contains many
streets and decisions. Streets group buildings and decisions, while a building
references a single decision and stores its visual state (`good`, `bad` or
`neutral`). Deleting parent records cascades to children.

## Running with Docker Compose

```bash
docker-compose up --build
```

The API will be available on `http://localhost:4000` with Swagger docs at `http://localhost:4000/docs`.
The frontend will be served on `http://localhost:3000`.

## Frontend structure

The Next.js application resides in `/client` using the App Router.
Public pages are placed under `src/app/(auth)` while authenticated sections live
under `src/app/(protected)` with an auth guard that checks the JWT token stored
in `localStorage`.

```
client/src/app
 ├─ (auth)            // login, register, confirm-email, google
 ├─ (protected)       // main city view, profile and CRUD pages
 └─ layout.tsx        // common navigation
```

UI end-to-end tests with Playwright can be run via `npm run test:ui`.

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

## User scenario

1. Register with your email using `POST /auth/register`.
2. Copy the confirmation code from the API logs and send it to `POST /auth/confirm-email`.
3. Log in via `POST /auth/login` to obtain a JWT token.
4. Create your first district with `POST /districts`.
5. Add streets with `POST /streets` passing the `districtId`.
6. Record a life decision with `POST /decisions` and set `isPositive` to `true` or `false`.
7. Attach a building via `POST /buildings` referencing the decision and choose its `visualState`.

The city grows as you add more districts, streets and decisions.

### Example requests

```bash
# create a district
curl -X POST $API_URL/districts -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Downtown"}'

# confirm email
curl -X POST $API_URL/auth/confirm-email \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","code":"123456"}'

# log in and get token
curl -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'

# list streets in a district
curl $API_URL/streets?districtId=<id> -H "Authorization: Bearer <token>"

# add a street
curl -X POST $API_URL/streets -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Main St","districtId":"<id>"}'

# create a decision and building
curl -X POST $API_URL/decisions -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Eat healthy","streetId":"<id>","districtId":"<district>","isPositive":true}'

curl -X POST $API_URL/buildings -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"number":"1","streetId":"<id>","decisionId":"<decision>","visualState":"good"}'
```

## Useful links

- Swagger UI: [http://localhost:4000/docs](http://localhost:4000/docs)
- Frontend: [http://localhost:3000](http://localhost:3000)

