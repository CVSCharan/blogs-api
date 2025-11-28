# Docker and CI Setup Guide

This guide explains the Docker and CI/CD configuration used in `blogs-auth` and how to replicate it for other microservices.

## 1. Docker Configuration

The project uses a multi-stage build process to optimize image size and security.

### `Dockerfile` Structure

Create a `Dockerfile` in the project root:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration files
COPY package*.json .npmrc ./
COPY tsconfig.json ./
COPY src ./src

# Build argument for GitHub Token (required for private packages)
ARG GITHUB_TOKEN
ENV GH_PAT=$GITHUB_TOKEN

# Install dependencies and build
RUN npm ci
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY package*.json .npmrc ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Build argument for GitHub Token
ARG GITHUB_TOKEN
ENV GH_PAT=$GITHUB_TOKEN

# Prune dev dependencies to keep image small
RUN npm prune --production

EXPOSE 3001

CMD ["node", "dist/index.js"]
```

### `.dockerignore`

Ensure you have a `.dockerignore` file to exclude unnecessary files:

```
node_modules
dist
coverage
.git
.gitignore
.env
.env.*
.npmrc
*.md
docs
tests
scripts
.husky
.vscode
.idea
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
```

### Building and Running Locally

To build the image locally (requires `GITHUB_TOKEN`):

```bash
docker build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN -t blogs-service .
```

## 2. CI/CD Configuration (GitHub Actions)

The project uses GitHub Actions for Continuous Integration.

### Workflow File: `.github/workflows/ci.yml`

Create this file to automate testing and checking on every push/pull request:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          registry-url: 'https://npm.pkg.github.com'

      - name: Install dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GH_PAT }}

      - name: Lint
        run: npm run lint

      - name: Format Check
        run: npm run format -- --check

      - name: Build
        run: npm run build

      - name: Test
        run: npm test
```

### Key Components

1.  **Triggers**: Runs on pushes and PRs to the `main` branch.
2.  **Node Setup**: Uses Node.js 20 and configures the registry to GitHub Packages.
3.  **Authentication**: Uses `${{ secrets.GH_PAT }}` to authenticate with the GitHub Package Registry (for installing `@cvscharan/blogs-db`, etc.). **Note:** You must set the `GH_PAT` secret in your repository settings.
4.  **Steps**:
    - `npm ci`: Clean install of dependencies.
    - `npm run lint`: Checks for code style issues.
    - `npm run format -- --check`: Checks for formatting issues.
    - `npm run build`: Verifies the project builds correctly.
    - `npm test`: Runs the test suite.

## 3. Replicating for New Services

When creating a new microservice (e.g., `blogs-api`):

1.  **Copy Files**: Copy `Dockerfile`, `.dockerignore`, and `.github/workflows/ci.yml` to the new repo.
2.  **Update Port**: If the new service runs on a different port, update `EXPOSE` in `Dockerfile`.
3.  **Secrets**: Ensure the repository has the `GH_PAT` secret configured in GitHub Actions secrets.
4.  **Scripts**: Ensure `package.json` has `build`, `lint`, `format`, and `test` scripts defined.
