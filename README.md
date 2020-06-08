# Authentication

## Author: Yazan Alaiwah
## Links and Resources
[PR](https://github.com/YazanAlaiwah-401-advanced-javascript/Authentication/pull/2)
[Github actions]()
## Documentaion
1. EndPoint: *GET* `/users` -> will return all data users in the db if the use is in the database
2. EndPoint: *POST* `/signin` -> will login the user and the password and usename will be besicAuth
3. EndPoint: *POST* `/signup` -> will singup the user in the database
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
EndPoint: /

## Tests
Lint test: npm run lint
<!-- unit test: npm test -->