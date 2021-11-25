# Project-Management-System
A project management system created using:
- Node.js and Express for the backend.
- MS SQL server for the database.
- React.js for the frontend.
- Redux for state management in the frontend.

## Modules
### 1. Users
  - Bcrypt to hash password before storing it to the database and to decrypt it when signing in.
  - Json web tokens(JWT) for authorization ie, generate a token when a user signs in so that they can perform private functionalities like updating their profile
  and also for viewing private routes.
  - Users are assigned projects which also contain tasks.
### 2. Projects
### 3. Tasks
