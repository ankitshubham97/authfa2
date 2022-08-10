# Auth server powered by AuthFA2

## Demo backend:
https://authfa2-backend.herokuapp.com/

## How to run locally
Auth server requires [Node.js](https://nodejs.org/) v10+ to run. The demo backend is deployed with v16.16.0

Install the dependencies and devDependencies.

```sh
git clone git@github.com:ankitshubham97/authfa2.git
cd authfa2/auth-server
npm i
```

Create a `.env` file at `authfa2/auth-server` directory. We need a few env vars for the server to work properly. This is the content for the `.env` file for the backend server deployed at https://authfa2-backend.herokuapp.com/ and you can create a similar one. Just make sure all the variables listed below are present; you can have their values assigned as per your use case. Regardless to say, *YOU SHOULD NEVER REVEAL THESE VARS WHILE DEPLOYING YOUR OWN BACKEND*. This is just a demo, so its okay here!
```sh
PORT=3000
JWT_SECRET=jwt-secret
NFT_CONTRACT_ADDRESS=KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY
```
Start the server.
```sh
npm run dev
```
It should be up and running at http://localhost:3000
