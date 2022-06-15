# city-library - www.mestskakniznica.sk

This readme should get you up & running. For more detailed documentation, check the /docs file in the root of the repo.

## First-time setup

You need `node` and `yarn` installed locally.

To install dependencies run:

```
yarn
```

For CMS setup see `strapi` directory. Presently you can run this against v3 strapi, either local one or the on running at `https://strapi-city-library.bratislava.sk`

## Run project locally

```
yarn dev
```

## Generate GraphQL

Strapi V4 does not export schema.graphql by default - instead, you'll need a running server to generate types from graphql endpoint. Otherwise the process is the same

```bash
# to update queries or mutations, modify *.graphql files in /graphql/queries directory
# have the strapi server running locally on port 1337 and run the following
yarn gen
```

### VSCode support

VSCode supports this plugin out of the box. However, sometimes it can use its own typescript version instead of the project one, resulting in not reading the local tsconfig. If you are using VSCode be sure to have `Use workspace version` option selected in `Typescript: Select Typescript Version...` command available in the [command pallete](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

<img width="729" alt="image" src="https://user-images.githubusercontent.com/35625949/153884371-e0f488d4-05b8-4b88-93d2-1caa7e6081f7.png">
