Sure, here's the detailed README for the backend setup without TypeORM and focusing on Prisma:

# Backend Circle App

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Additional Setup](#additional-setup)
- [Conclusion](#conclusion)

## Introduction

This project is a backend application built using Node.js, Express, TypeScript, and PostgreSQL. It uses Prisma for database interactions and includes various other libraries for functionality like authentication, validation, and file uploads.

## Installation

Follow these steps to set up the project on your local machine.

### 1. Initialize the Project

First, initialize a new Node.js project.

```sh
npm init -y
```

### 2. Install Development Dependencies

Install the necessary development dependencies.

```sh
npm install -D typescript @types/express @types/node ts-node
```

### 3. Initialize TypeScript

Initialize TypeScript in your project.

```sh
npx tsc --init
```

### 4. Install Core Dependencies

Install the core dependencies for the project.

```sh
npm install express axios cors
```

## Database Setup

### 1. Install Prisma

Install Prisma for database CRUD operations.

```sh
npm install prisma --save-dev
```

### 2. Initialize Prisma

Initialize Prisma in your project.

```sh
npx prisma init --datasource-provider postgresql
```

### 3. Set Up Environment Variables

Set up the database connection string in the `.env` file.

```
DATABASE_URL="postgresql://<user>:<password>@localhost:<port>/<database>?schema=public"
```

### 4. Run Prisma Migrations

Run the initial Prisma migration.

```sh
npx prisma migrate dev
```

Push the Prisma schema to the database.

```sh
npx prisma db push
```

Open Prisma Studio to interact with your database.

```sh
npx prisma studio
```

### 5. Generate Prisma Client

Generate the Prisma client.

```sh
npx prisma generate
```

## Project Structure

A typical project structure might look like this:

```plaintext
my-project/
├── src/
│   ├── controllers/
│   ├── entities/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── index.ts
│   └── prisma/
│       ├── schema.prisma
│       └── client.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

### Starting the Development Server

To start the development server, use `ts-node` to run your `index.ts` file.

```sh
npx ts-node src/index.ts
```

### Creating Controllers, Routes, and Services

1. **Controllers:**

   Create controller files in `src/controllers` to handle request and response logic.

   ```ts
   // src/controllers/UserController.ts
   import { Request, Response } from 'express';
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   export const getUsers = async (req: Request, res: Response) => {
     const users = await prisma.user.findMany();
     res.json(users);
   };
   ```

2. **Routes:**

   Define routes in `src/routes` and link them with controllers.

   ```ts
   // src/routes/userRoutes.ts
   import { Router } from 'express';
   import { getUsers } from '../controllers/UserController';

   const router = Router();
   router.get('/users', getUsers);

   export default router;
   ```

3. **Services:**

   Create service files in `src/services` to handle business logic.

   ```ts
   // src/services/UserService.ts
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   export const getAllUsers = async () => {
     return await prisma.user.findMany();
   };
   ```

## Additional Setup

### Validation

Install `joi` for validation.

```sh
npm install joi
```

### Authentication

Install `bcrypt` and `jsonwebtoken` for authentication.

```sh
npm install bcrypt jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

### Environment Variables

Install `dotenv` to manage environment variables.

```sh
npm install dotenv
```

### File Uploads

Install `multer` for file uploads.

```sh
npm install multer
```

### Cloudinary

Install `cloudinary` for handling image uploads.

```sh
npm install cloudinary
```

## Example Files

### src/index.ts

```ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### src/prisma/client.ts

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

## Conclusion

By following these steps, you will have a fully functional backend application set up with Node.js, Express, TypeScript, PostgreSQL, and Prisma. This setup provides a solid foundation for building a robust and scalable backend service.
