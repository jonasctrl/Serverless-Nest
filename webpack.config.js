const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

const ignoreModules = [
  'pg',
  'pg-native',
  'pg-query-stream',
  'kcors',
  'koa',
  'koa-bodyparser',
  'canvas',
  'mongodb',
  'mysql',
  'mysql2',
  'oracledb',
  'redis',
  'sqlite3',
  'koa-multer',
  'fastify-swagger',
  'koa-router',
  'cache-manager',
  '@nestjs/websockets/socket-module',
  '@nestjs/microservices',
  '@nestjs/microservices/microservices-module',
  '@mikro-orm/core',
  '@nestjs/mongoose',
  '@nestjs/sequelize',
];

const ignorePlugin = new webpack.IgnorePlugin({
  resourceRegExp: new RegExp(`^(${ignoreModules.join('|')})$`),
});

const lazyImports = [
  '@nestjs/websockets',
  '@nestjs/microservices',
  '@nestjs/platform-express',
  '@nestjs/graphql',
  'cache-manager',
  'class-validator',
  'class-transformer',
  'graphql',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  'class-transformer/storage',
];

const lazyImportsPlugin = new webpack.IgnorePlugin({
  checkResource(resource) {
    if (lazyImports.includes(resource)) {
      try {
        require.resolve(resource);
      } catch (err) {
        return true;
      }
    }
    return false;
  },
});

module.exports = {
  context: __dirname,
  entry: slsw.lib.entries,
  mode: 'none',
  // NOTE: Disable source maps in production for smaller bundle size (might be useful to enable it later)
  devtool: isLocal ? 'inline-source-map' : false,
  externals: isLocal ? [nodeExternals()] : undefined,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '.serverless'),
          path.resolve(__dirname, '.webpack'),
        ],
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true, //NOTE: !isLocal,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          parse: {
            ecma: 2018,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
    ],
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
    library: { type: 'commonjs' },
    clean: true,
  },
  plugins: [ignorePlugin, lazyImportsPlugin],
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.cjs'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'rxjs/operators': path.resolve(__dirname, 'node_modules/rxjs/dist/bundles/rxjs.umd.min.js'),
      rxjs: path.resolve(__dirname, 'node_modules/rxjs/dist/bundles/rxjs.umd.min.js'),
      'js-yaml': path.resolve(__dirname, 'node_modules/js-yaml/dist/js-yaml.min.js'),
      'class-transformer': path.resolve(
        __dirname,
        'node_modules/class-transformer/bundles/class-transformer.umd.min.js',
      ),
      'class-validator': path.resolve(
        __dirname,
        'node_modules/class-validator/bundles/class-validator.umd.min.js',
      ),
      axios: path.resolve(__dirname, 'node_modules/axios/dist/node/axios.cjs'),
    },
  },
  stats: {
    all: false,
    modules: true,
    errors: true,
    warnings: false,
    moduleTrace: true,
    errorDetails: true,
    warningsFilter: /\.\/node_modules/,
  },
  target: 'node',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  node: {
    __dirname: false,
  },
  experiments: {
    topLevelAwait: true,
  },
};
