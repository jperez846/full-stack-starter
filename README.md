# Postgres DevContainer

1. Create an `.env` file and place it inside the `.devcontainer` folder.

    ```text
    POSTGRES_USER="ladygaga"
    POSTGRES_PASSWORD="1234"
    POSTGRES_DB="gagadb"
    POSTGRES_URL="postgresql://ladygaga:1234@postgres:5432/gagadb?schema=public"
    ```

    Replace `ladygaga`, `gagadb`, and `1234` with desired values.

2. Reopen the project in a dev container.
