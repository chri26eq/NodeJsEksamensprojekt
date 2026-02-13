# CarCards - A Multiplayer Game

## Prerequisites

This app requires two `.env` files:

- One in the `./client` directory  
- One in the `./server` directory  

Use the provided `.env.example` files as templates to create your own `.env` files.

**All commands must be run from the root directory.**

## Getting Started

After creating your own `.env` files, run the following command:

```bash
npm run install-start
```

This will:

- Install all dependencies  
- Set up the database  
- Start the app  

If you need to reset the database, first terminate the running app and then run:

```bash
npm run resetDatabase
```

After resetting, you can start the app again with:

```bash
npm start
```

## Default Users

For convenience, the database comes seeded with four default users:

- Email: `1`, Password: `1`  
- Email: `2`, Password: `2`  
- Email: `3`, Password: `3`  
- Email: `4`, Password: `4`  
- Email: `5`, Password: `5`  

You're also welcome to sign up with your own credentials.

## Matchmaking and Sessions

User credentials are managed using **sessions**. This means that:

- To have two players play a match, you must use **two different browsers**.  
- Players will be **automatically paired** when they search for a match.
