# Full-Stack Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements

1. WSL 2 (Windows)
1. Docker Desktop (MacOS & Windows)
1. Dev Containers extension for VSCode

Enable **host networking** in Docker Settings / Rersources, for easy development.

## Development

1. Create an `.env` file and place it inside the `.devcontainer` folder.

    ```text
    POSTGRES_USER="starter"
    POSTGRES_PASSWORD="1234"
    POSTGRES_DB="starterdb"
    POSTGRES_URL="postgresql://starter:1234@postgres:5432/starterdb?schema=public"
    ```

    Replace `starter`, `starterdb`, and `1234` with desired values.

2. Reopen the project in a Dev Container using VSCode.

3. Run the project inside your Dev Container.

    ```bash
    # API
    npm i
    npm run db:setup
    npm run dev
    ```

    ```bash
    # SPA
    cd frontend
    npm i
    npm run dev
    ```

## Deployment to Render.com

- Provision a Postgres database, deploy the web service to Render by linking your GitHub repo, set `POSTGRES_URL` env variable.

- The build command in Render should be `./scripts/build.sh`
