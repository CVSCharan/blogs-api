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

CMD ["node", "dist/src/index.js"]
