const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Production optimizations
      if (env === 'production') {
        // Enhanced optimization settings
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          usedExports: true,
          sideEffects: false,
          minimize: true,
          moduleIds: 'deterministic',
          chunkIds: 'deterministic',
          splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
            cacheGroups: {
              // React and React-DOM
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react-vendor',
                chunks: 'all',
                priority: 30,
                enforce: true,
              },
              // UI Libraries
              ui: {
                test: /[\\/]node_modules[\\/](@headlessui|@heroicons|flowbite-react|lucide-react|react-icons)[\\/]/,
                name: 'ui-vendor',
                chunks: 'all',
                priority: 25,
              },
              // Animation and motion libraries
              animation: {
                test: /[\\/]node_modules[\\/](framer-motion|react-transition-group)[\\/]/,
                name: 'animation-vendor',
                chunks: 'all',
                priority: 20,
              },
              // Charts and data visualization
              charts: {
                test: /[\\/]node_modules[\\/](recharts|react-apexcharts|apexcharts)[\\/]/,
                name: 'charts-vendor',
                chunks: 'all',
                priority: 18,
              },
              // Firebase and backend services
              services: {
                test: /[\\/]node_modules[\\/](firebase|appwrite|axios|socket\.io-client)[\\/]/,
                name: 'services-vendor',
                chunks: 'all',
                priority: 15,
              },
              // Other vendor libraries
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
              },
              // Common chunks
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 5,
                reuseExistingChunk: true,
              },
            },
          },
        };

        // Add Service Worker for caching
        webpackConfig.plugins.push(
          new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts',
                  expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                  },
                },
              },
              {
                urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'images',
                  expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                  },
                },
              },
              {
                urlPattern: /\/api\/.*/,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'api-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 5, // 5 minutes
                  },
                  networkTimeoutSeconds: 3,
                },
              },
            ],
          })
        );

        // Add bundle analyzer only when ANALYZE=true
        if (process.env.ANALYZE === 'true') {
          webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: 'bundle-report.html',
              generateStatsFile: true,
              statsFilename: 'webpack-stats.json',
            })
          );
        }
      }

      // Development optimizations
      if (env === 'development') {
        // Enable source maps for better debugging
        webpackConfig.devtool = 'eval-source-map';
        
        // Optimize development build speed
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false,
        };
      }

      // Add module resolution optimizations
      webpackConfig.resolve.modules = [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ];

      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      '@loadable/babel-plugin'
    ],
  },
};
