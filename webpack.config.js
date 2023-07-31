const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const isLocal = slsw.lib.webpack.isLocal;

const ignorePlugin = new webpack.IgnorePlugin({
  resourceRegExp:
    /^(canvas|mongodb|mysql|mysql2|oracledb|pg|pg-native|pg-query-stream|redis|sqlite3|kcors|koa|koa-bodyparser|koa-multer|fastify-swagger|koa-router|cache-manager|\@nestjs\/websockets\/socket-module|\@nestjs\/microservices|\@nestjs\/microservices\/microservices-module)$/,
});

const lazyImports = [
  '@nestjs/websockets',
  '@nestjs/microservices',
  '@nestjs/platform-express',
  '@nestjs/grahpql',
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
  devtool: 'inline-nosources-source-map',
  entry: slsw.lib.entries,
  mode: 'none',
  externals: isLocal ? [nodeExternals()] : undefined,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
    pathinfo: false,
    library: { type: 'commonjs' },
    path: path.resolve(__dirname, '.webpack'),
  },
  plugins: [ignorePlugin, lazyImportsPlugin],
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.cjs'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      // Below optimizations can be safely disabled all or one by one
      // if any of them is suspected to cause problems after package upgrade (crashing, etc.)
      ...{
        // below are aliases to portable UMD minified variants of certain packages
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

        // to avoid multiple copies of "axios" package bundled (no preminified variant available)
        axios: path.resolve(__dirname, 'node_modules/axios/dist/node/axios.cjs'),

        // to bundle only one latest version of multiple referred compatible versions of below packages
        // latest versions of packages added to package.json
        // version compatibility and safety evaluated
        'source-map': path.resolve(__dirname, 'node_modules/source-map'),
        tslib: path.resolve(__dirname, 'node_modules/tslib'),
        luxon: path.resolve(__dirname, 'node_modules/luxon'),
        'iconv-lite': path.resolve(__dirname, 'node_modules/iconv-lite'),
        express: path.resolve(__dirname, 'node_modules/express'),
        'body-parser': path.resolve(__dirname, 'node_modules/body-parser'),
        jsonwebtoken: path.resolve(__dirname, 'node_modules/jsonwebtoken'),
        semver: path.resolve(__dirname, 'node_modules/semver'),
        'concat-stream': path.resolve(__dirname, 'node_modules/concat-stream'),
      },
    },

    // for bundling, prefers ES module variant over default CommonJS variant in external NPM packages
    conditionNames: ['es2015', 'module', 'import', 'node', 'default'],
    mainFields: ['es2015', 'module', 'main'],
  },
  stats: {
    // copied from `'minimal'`
    all: false,
    modules: true,
    errors: true,
    warnings: true,
    // our additional options
    moduleTrace: true,
    errorDetails: true,
    warningsFilter: /\.\/node_modules/,
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  experiments: {
    topLevelAwait: true,
  },
};
