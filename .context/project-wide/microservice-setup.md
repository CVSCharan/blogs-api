# Microservice Setup Guide

This guide details how to set up a new microservice in the `blogs` ecosystem, following the standards established in `blogs-auth`.

## 1. Initialization

Initialize a new Node.js project with TypeScript:

```bash
mkdir blogs-new-service
cd blogs-new-service
npm init -y
npm install -D typescript ts-node nodemon @types/node
npx tsc --init
```

## 2. Project Structure

Adopt the Clean Architecture structure:

```
src/
├── application/        # Business logic
│   ├── dtos/           # Data Transfer Objects
│   ├── interfaces/     # Port definitions
│   ├── mappers/        # Data mappers
│   └── services/       # Application services
├── domain/             # Enterprise business rules
│   ├── entities/       # Domain entities
│   ├── errors/         # Domain-specific errors
│   └── repositories/   # Repository interfaces
├── infrastructure/     # Frameworks & Drivers
│   ├── cache/          # Redis/Cache implementations
│   ├── database/       # Prisma/DB implementations
│   └── security/       # Auth & Security implementations
├── presentation/       # Interface Adapters
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   └── routes/         # Express routes
├── common/             # Shared utilities (Logger, etc.)
├── config/             # Configuration (Env, Swagger)
├── app.ts              # App setup
├── server.ts           # Server entry point
└── index.ts            # Main entry point
```

## 3. Dependencies

### Core Dependencies

```bash
npm install express cors helmet winston dotenv zod uuid
npm install -D @types/express @types/cors @types/uuid
```

### Shared Packages (GitHub Registry)

You need to authenticate with GitHub Packages to install these.

1. Create `.npmrc`:

```ini
@cvscharan:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Install packages:

```bash
# Source your GitHub token first
source ./scripts/set_github_token.sh

npm install @cvscharan/blogs-db @cvscharan/blogs-cache
```

### Dev Tools & Testing

```bash
npm install -D jest ts-jest supertest @types/jest @types/supertest
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-security globals typescript-eslint
npm install -D prisma @prisma/client
```

## 4. Configuration Files

### `tsconfig.json`

Standard TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### `.eslintrc.json`

Linting rules enforcing naming conventions and best practices:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": { "project": "tsconfig.json", "sourceType": "module" },
  "plugins": ["@typescript-eslint/eslint-plugin"],
  "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  "root": true,
  "env": { "node": true, "jest": true },
  "ignorePatterns": [".eslintrc.json"],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": { "regex": "^I[A-Z]", "match": false }
      },
      { "selector": ["class", "enum"], "format": ["PascalCase"] },
      { "selector": ["variable", "function"], "format": ["camelCase", "UPPER_CASE", "PascalCase"] }
    ]
  }
}
```

### `nodemon.json`

Development server configuration:

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.test.ts"],
  "exec": "ts-node src/index.ts"
}
```

### `jest.config.js`

Testing configuration:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
```

## 5. Scripts

Update `package.json` scripts:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon",
  "lint": "eslint .",
  "format": "prettier --write \"src/**/*.ts\" \"tests/**/*.ts\"",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "prepare": "husky"
}
```

## 6. Environment Variables

Create a `src/config/env.config.ts` using `zod` for validation:

```typescript
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  // Add service-specific variables
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
```

## 7. GitHub Authentication Script

Create `scripts/set_github_token.sh`:

```bash
#!/bin/bash

ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
    # Read GITHUB_TOKEN from .env file
    # Using grep and sed to extract the value
    GITHUB_TOKEN=$(grep -E '^GITHUB_TOKEN=' "$ENV_FILE" | sed -e 's/^GITHUB_TOKEN=//' -e 's/"//g' -e "s/'//g")

    if [ -n "$GITHUB_TOKEN" ]; then
        export GITHUB_TOKEN
        echo "GITHUB_TOKEN has been exported from $ENV_FILE."
    else
        echo "GITHUB_TOKEN not found or is empty in $ENV_FILE."
    fi
else
    echo "$ENV_FILE not found in the current directory."
fi
```

Make it executable: `chmod +x scripts/set_github_token.sh`
