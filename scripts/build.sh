#!/usr/bin/env bash

# Install express deps
npm install

# Install react deps
cd frontend && npm install --include=dev

# Build react app
npm run build
