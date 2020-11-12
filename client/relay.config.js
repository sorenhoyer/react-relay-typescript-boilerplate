module.exports = {
  schema: './schema.server.graphql',
  src: './src',
  // extensions: ['js'],
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  verbose: true,
  watchman: false,
  watch: true,
  validate: false,
  quiet: false,
  persistOutput: undefined,
  noFutureProofEnums: true,
  language: 'typescript',
  // artifactDirectory: 'src/__generated__',
  customScalars: {
    DateTime: 'string',
  },
};
