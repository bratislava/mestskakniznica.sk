import { defineConfig } from 'i18next-cli'

export default defineConfig({
  locales: ['sk'],
  extract: {
    input: '{assets,components,hooks,modules,navikronos,pages,services,styles,utils}/**/*.{tsx,ts}',
    output: './public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation',
    keySeparator: false,
    functions: ['t', '*.t'],
    transComponents: ['Trans'],
  },
  types: {
    input: ['public/locales/{{language}}/{{namespace}}.json'],
    output: 'src/types/i18next.d.ts',
  },
})
