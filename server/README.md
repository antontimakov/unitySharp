# unity-webgl-node
A simple nodejs server for Unity Webgl builds (with gzip compression)

# Instructions

- `yarn` or `npm i`
- Place the Unity WEBGL build inside `public/Build/`
- `yarn run dev` or `npm run dev` to start node server on dev mode (will restart on any saved changed)


# Config

Copy `EXAMPLE.env` to `.env` and change the values there
> Any value starting with `PUBLIC-` will be accessible through an api endpoint (with or without that prefix)
> To check all public api keys/values go to `/api/env`