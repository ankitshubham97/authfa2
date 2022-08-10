# Sample app powered by AuthFA2

## Demo App:
https://authfa2-frontend.vercel.app

## How to run locally
Auth server requires [Node.js](https://nodejs.org/) v10+ to run. The demo app is deployed with v16.16.0

Install the dependencies and devDependencies

```sh
git clone git@github.com:ankitshubham97/authfa2.git
cd authfa2/frontend
npm i
```

You would probably want to point the app to your locally deployed backend at http://localhost:3000  (See [README of Auth Server][README Auth Server]) for more details. If that's the case, you would need to change frontend/src/constants.js file a bit. Change the value of `API_BASE_URL` to `http://localhost:3000` (or wherever your backend is deployed).

Start the server.
```sh
npm run start
```
It should be up and running at http://localhost:3001

[README Auth Server]: <../authfa2-js/README.md>
