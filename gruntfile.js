var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      all: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        report: 'gzip'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.all.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    clean: ['dist'],
    dependo: {
      targetPath: 'dist',
      outputPath: './doc/dependencies',
      format: 'amd'
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', 'Lints and unit tests', ['jshint', 'karma']);
  grunt.registerTask('doc', 'Generated documentation', ['dependo']);
  grunt.registerTask('default', 'Default task', ['clean', 'concat', 'test', 'uglify']);

};
