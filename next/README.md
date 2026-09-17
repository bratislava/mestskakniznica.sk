# mestskakniznica.sk - Next.js

This readme should get you up & running.

## First-time setup

You need `node` and `npm` installed locally.

Install dependencies and create `.env.local` file which is .gitignored and used for local dev:

```
npm install
cp .env.example .env.local
```

## Run project locally

You need a CMS instance to run the web app against. For CMS setup see `strapi` directory.
`.env.example` points to a local Strapi on `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` - you can also run the
project against the deployed Strapi by uncommenting the alternative `NEXT_PUBLIC_STRAPI_URL` and
`NEXT_PUBLIC_MEILISEARCH_*` values in your `.env.local`. Then run:

```
npm run dev
```

## Generate GraphQL

To update queries or mutations, modify `*.graphql` files in `/services/graphql/queries` directory.
The Schema is exported but the codegen is set up to run against running Strapi instance to generate types from
graphql endpoint, simply run:

```bash
# expects strapi running locally on port 1337
npm run gen
```

## Project structure and conventions

For more about our conventions and best practices, see our [docs](https://bratislava.github.io/).

The project is being revisited. We are revisiting each component and service to make it more reliable, cleaner and
readable.
Revisited code is moved to `modules` folder. The older components that still need some work, or do not follow our
conventions
are left in `components` folder. You may also find some unused code or components, feel free to clen it up :).

The process of revisiting should be done as follows:

- find the component you want to change
- make the changes you need
- try to update/change the whole component to follow our conventions (props, types, code-style, formatting, etc.)
- if the component meets our standards, move it to `modules` folder

The `modules` folder tries to be [structured by domain](https://alexkondov.com/tao-of-react/#group-by-route-module). Any
suggestions are welcome :).
