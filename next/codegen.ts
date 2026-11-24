import { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  schema: '../strapi/schema.graphql',
  documents: './services/graphql/queries/**/*.{gql,graphql}',
  generates: {
    './services/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        // Strapi sends these scalars as ISO strings, without a mapping codegen types them as `unknown`.
        scalars: { Date: 'string', DateTime: 'string', Time: 'string' },
      },
    },
  },
}

export default codegenConfig
