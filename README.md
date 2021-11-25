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
  - A user can work on a single Project
  - A project has multiple tasks
  
### 3. Tasks
  - A tasks can belong to a single project
  - Users can be assigned multiple projects

### Database

Create a MS SQL server database and give it your preferred name and add three tables
  - Users
  - Projects
  - Tasks

### Env Variables

Create a .env file in the root and add the following
```
DB_HOST= localhost
DB_USER= ms sql server username
DB_NAME= your database name
DB_PASSWORD= your sql server password
SECRET_KEY= your secret key

```

### Install Dependencies (root,client & server)

```
# install concurrently in the root directory
npm install

cd server
npm install

cd client
npm install
```

### Run

```
# Run client (:3000) & server (:8001)
npm run dev

