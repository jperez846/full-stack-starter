#!/usr/bin/env bash

# Install express deps
npm install

npx prisma generate


# Install react deps
cd frontend && npm install --include=dev

# Build react app
npm run build
