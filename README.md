# Authentication

## Author: Yazan Alaiwah
## Links and Resources
[PR](https://github.com/YazanAlaiwah-401-advanced-javascript/Authentication/pull/2)
[Github actions]()
## Documentaion
1. EndPoint: *GET* `/users` -> will return all data users in the db if the use is in the database
2. EndPoint: *POST* `/signin` -> will login the user and the password and usename will be besicAuth
3. EndPoint: *POST* `/signup` -> will singup the user in the database
4. EndPoint: *GET* `/secret` -> will return the user data if he have the token
4. EndPoint: *GET* `/read` -> will return the information the user need 
4. EndPoint: *POST* `/add` -> will add data for user if has a permission
4. EndPoint: *PUT* `/change` -> will update data if the user has a permission
4. EndPoint: *DELETE* `/remove` -> will delete data if the user has a permission
## Modules

1. server.js
2. router.js
3. users-collection
4. user-schema
## Setup
1. .env requirements
3. MONGODB_URI - to the running mongo 
4. SECRET - to generate accses token
5. CLIENT ID from linkedin
6. CLIENT SECERT - from linkedin
7. redirect-uri from linkedin

## How to initialize/run your application
1. npm install
2. npm start


## Tests
Lint test: npm run lint
unit test: npm test

## UML

![uml](./assets/class13.png)