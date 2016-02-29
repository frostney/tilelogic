'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/tilelogic.umd.js',
      'test/*.js',
    ],
    preprocessors: {
      'dist/tilelogic.umd.js': ['coverage'],
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'html',
        subdir: 'report-html',
      }, {
        type: 'lcov',
        subdir: 'report-lcov',
      }],
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    captureTimeout: 60000,
    singleRun: true,
  });
};
