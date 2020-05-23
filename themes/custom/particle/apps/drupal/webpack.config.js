/**
 * Drupal-specific webpack config.
 */

const requireContext = require('require-context');
const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');
const particle = require('../../particle');
const {
  DrupalLibrariesPlugin,
  DrupalLibraryEntryGenerator
} = require('drupal-libraries-webpack-plugin');

// Constants: environment
const { NODE_ENV } = process.env;
// Constants: root
const { ASSETS_ATOMIC_FOLDER } = require('../../particle.root.config');
// Constants: app
const appConfig = require('./particle.app.config');

const {
  APP_NAME,
  APP_PATH,
  APP_DESIGN_SYSTEM,
  APP_DIST,
  APP_DIST_PUBLIC,
} = appConfig;

// The custom class is needed in order to have a configurable version number.
class StaticVersionLibraryGenerator extends DrupalLibraryEntryGenerator {
  constructor(version) {
    super();
    this.version = version;
  }

  async versionGenerator(metadata) {
    return this.version;
  }
}

const atomicContext = requireContext(
  // From patterns folder
  path.resolve(APP_DESIGN_SYSTEM, '_patterns'),
  // Deep dive all directories below
  true,
  // Get the first folders after atoms|molecules|organisms
  /(01-atoms|02-molecules|03-organisms|04-templates|05-pages|06-react-components|99-temporary)\/[a-z,-]*\/index\.js$/
);

const keys = atomicContext.keys();
const componentEntries = keys.reduce((accumulator, componentPath) => {
  // "require" the component
  const nameMatcher = componentPath.match(/\/([\w-]+)\/index.js/);
  if (!nameMatcher.length) {
    return;
  }
  const name = nameMatcher[1].replace(/-/g, '_');
  // eslint-disable-next-line consistent-return
  return Object.assign(accumulator, {
    [name]: [path.join(APP_DESIGN_SYSTEM, '_patterns', componentPath)],
  });
}, {});
const componentPrefix = 'Particle_';

const shared = {
  entry: Object.assign(
    {
      jquery: [
        path.join(APP_PATH, 'drupal-jquery.js'),
      ],
      protons: [
        path.join(APP_DESIGN_SYSTEM, '_patterns', '00-protons', 'index.js'),
      ],
    },
    componentEntries
  ),
  output: {
    path: APP_DIST,
    publicPath: APP_DIST_PUBLIC,
    chunkFilename: '[name].js',
    libraryTarget: 'umd',
    library: `${componentPrefix}[name]`,
  },
  module: {
    rules: [
      {
        test: /\.twig$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: ASSETS_ATOMIC_FOLDER,
              context: APP_DESIGN_SYSTEM,
              emit: true,
              emitFile: true,
            },
          },
          {
            loader: path.resolve(
              __dirname,
              'tools',
              'attach-library-loader.js'
            ),
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(
              __dirname,
              'tools',
              'drupal-behaviors-loader.js'
            ),
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(xml|html|webmanifest|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify(APP_NAME),
    }),
    new DrupalLibrariesPlugin({
      path: 'apps/drupal/particle.libraries.yml',
      libraryEntryGenerator: new StaticVersionLibraryGenerator('1.x'),
      prepareFile: (file, compiler, compilation) => {
        // Add extra core library which will be always loaded.
        file.content['core'] = {
          dependencies: [
            'core/drupal',
            'core/drupalSettings',
            'particle/runtime',
            'particle/vendor',
          ],
        };

        file.content.jquery.js['jquery.js'] = {
          minified: true,
          weight: -20,
        };

        // Adjusting weights of CSS files.
        file.content.protons.css.theme['protons.css'] = {
          weight: -50,
        };

        file.content.temporary.css.theme['temporary.css'] = {
          weight: 100,
        };

        // Make sure components get "particle/core" library as dependency
        // instead of "runtime" and "vendor".
        for (var lib in file.content) {
          const excludedLibs = [
            'runtime',
            'vendor',
            'core',
          ];

          if (excludedLibs.indexOf(lib) === -1) {
            const library = file.content[lib]
            file.content[lib].dependencies = ['particle/core']
          }
        }

        return DrupalLibrariesPlugin.defaults.prepareFile(file, compiler, compilation);
      },
    }),
  ],
  externals: [
    {
      jquery: 'jQuery',
      holderjs: 'Holder',
    },
    // Any import prefixed with particle will resolve to an external:
    // The request will be resolved as a property on the window object with
    // the component's name, prefixed by the component prefix.
    (context, request, callback) => {
      // Load atom, molecule and organism components like this: window.Particle_button
      if (/^(atoms|molecules|organisms)/.test(request)) {
        const moduleNameMatcher = request.match(
          /(atoms|molecules|organisms)\/([a-z-]*)/
        );
        if (moduleNameMatcher && moduleNameMatcher.length) {
          return callback(
            null,
            `window ${componentPrefix}${moduleNameMatcher[2]}`
          );
        }
      } else if (/^protons$/.test(request)) {
        // Load protons like this window.Particle_protons
        return callback(null, `window ${componentPrefix}${request}`);
      }
      return callback();
    },
  ],
};

const dev = {
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new RunScriptAfterEmit({
      exec: [
        // prettier-ignore
        `echo \n🚀 Webpack Drupal ${NODE_ENV} build complete! 
        Edit apps/drupal/webpack.config.js to replace this line with 
        'drupal cr all' now. 🚀\n`,
      ],
    }),
  ],
};

const prod = {
  stats: {
    children: false,
    entrypoints: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]((core-js|@babel|regenerator-runtime|svg4everybody|webpack|)[\\/]|bootstrap[\\/]js[\\/]dist[\\/]util)/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
};

const config = particle(
  // app: webpack
  { shared, dev, prod },
  // app: config
  appConfig,
  // Use extract css
  {
    cssMode: 'extract',
  },
);

module.exports = config;