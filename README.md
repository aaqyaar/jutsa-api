# Jutsa Voting Backend

JUTSA ( Jamhuriya University Technology Students Association ) is a student association at Jamhuriya University of Science and Technology. This app allows students to vote for their favorite candidates.

The backend is written in Node.js using Nestjs and Postgres as the database. (Prisma is used as the ORM).
The frontend is written in Flutter.

## Features

- [ ] Authentication
- [ ] Authorization
- [ ] Competitors
- [ ] Votes
- [ ] Upload Image
- [ ] Docker Support

## Requirements

- [x] Node.js
- [x] Nestjs CLI
- [x] Postgres
- [x] Yarn
- [x] Docker (optional)

## Installation

```bash
git clone https://github.com/aaqyaar/jutsa-api.git
cd jutsa-api
yarn install
```

## Running the api

```bash
# development
yarn start:dev
# production mode
yarn start:prod
```

## API Documentation

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| `POST` | /api/auth/register   | Create a new user               |
| `POST` | /api/auth/login      | Authenticate a user             |
| `GET`  | /api/auth/me         | Get current user                |
| `GET`  | /api/auth/logout     | Logout current user             |
| `GET`  | /api/users           | Get all users                   |
| `GET`  | /api/users/:id       | Get a user                      |
| `POST` | /api/competitor     | Create a competitor             |
| `GET`  | /api/competitor     | Get all competitors             |
| `GET`  | /api/competitors/:id | Get a competitor                |
| `POST` | /api/votes           | Create a vote                   |
| `GET`  | /api/votes           | Get all votes                   |
| `GET`  | /api/votes/:id       | Get a vote                      |
| `POST` | /api/upload/image    | Upload an image (pass formData) |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Docker

```bash
docker compose up -d (detach mode)
```
