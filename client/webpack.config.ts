/* eslint-disable import/no-extraneous-dependencies */
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import RelayCompilerWebpackPlugin from 'relay-compiler-webpack-plugin';
import { Configuration as WebpackConfiguration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import RelayCompilerLanguageTypescript from 'relay-compiler-language-typescript';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const { NODE_ENV, REACT_RELAY_TYPESCRIPT_BOILERPLATE_PORT } = process.env;

if (!NODE_ENV) throw new Error('The NODE_ENV environment variable is required but was not specified.');

const dotenvFiles = [
  `./.env.${NODE_ENV}.local`,
  `./.env.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `./.env.local`,
  './.env',
].filter(Boolean);

// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
(dotenvFiles as string[]).forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile,
      }),
    );
  }
});

// Grab NODE_ENV and REACT_RELAY_TYPESCRIPT_BOILERPLATE_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_RELAY_TYPESCRIPT_BOILERPLATE = /^REACT_RELAY_TYPESCRIPT_BOILERPLATE_/i;

function getClientEnvironment(/* publicUrl */) {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_RELAY_TYPESCRIPT_BOILERPLATE.test(key))
    .reduce(
      (env, key) => {
        // eslint-disable-next-line no-param-reassign
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        // PUBLIC_URL: publicUrl,
      },
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      // eslint-disable-next-line no-param-reassign
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

const env = getClientEnvironment();

const outputDir = path.join(__dirname, 'dist');

const isDevelopment = NODE_ENV !== 'production';

const config: Configuration = {
  entry: './src/index.tsx',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    // filename: 'bundle.js',
    path: outputDir,
    publicPath: '/',
  },
  resolve: {
    mainFields: ['browser', 'module', 'js:next', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    contentBase: outputDir,
    port: REACT_RELAY_TYPESCRIPT_BOILERPLATE_PORT ? +REACT_RELAY_TYPESCRIPT_BOILERPLATE_PORT : 3000,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new DefinePlugin(env.stringified),
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    // }),
    new HtmlWebpackPlugin({
      inject: false,
      templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="root"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
    new RelayCompilerWebpackPlugin({
      languagePlugin: RelayCompilerLanguageTypescript,
      schema: path.resolve(__dirname, './schema.server.graphql'), // or schema.json
      src: path.resolve(__dirname, './src'),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};

export default config;
