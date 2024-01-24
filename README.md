# Cupcake Store

A server for a Cupcake store


TO USE (assumes dev envinroment running node 16.x, npm and docker)
1. "npm install" to install all necessary packages
2. "npm run build" - this will pull a docker image of a postgres database, delete any existing cupcake table, and intialize a new cupcake table
3. "npm run start" - to start the server
4. "npm run test" - to run jest tests