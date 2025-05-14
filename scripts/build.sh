#!/usr/bin/env bash

# Install express deps
# npm install



# Install react deps
# cd frontend && npm install --include=dev

# Build react app
# npm run build
#!/usr/bin/env bash
set -e

# Step 1: Install backend dependencies
cd api
npm install
cd ..

# Step 2: Generate Prisma client
npx prisma generate

# Optional: run DB migrations
# npx prisma migrate deploy

# Step 3: Install frontend dependencies and build
cd frontend
npm install --include=dev
npm run build
