var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    amd_tamer: {
      options: {
        base: 'src/',
        namespace: 'tilemap'
      },
      scripts: {
        src: ['src/**/*.js'],
        dest: 'tmp/<%= pkg.name %>.js'
      }
    },
    concat: {
      all: {
        src: ['tmp/**/*.js'],
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
    clean: ['dist', 'tmp'],
    dependo: {
      targetPath: 'dist',
      outputPath: './doc/dependencies',
      format: 'amd'
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', 'Lints and unit tests', ['jshint']);
  grunt.registerTask('doc', 'Generated documentation', ['dependo']);
  grunt.registerTask('default', 'Default task', ['clean', 'amd_tamer', 'concat', 'test', 'uglify']);

};
