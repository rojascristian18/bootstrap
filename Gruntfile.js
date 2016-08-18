module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.config.init({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'src/**/*.js', 'Gruntfile.js'
      ]
    },

    uglify: {
      dev: {
        options: {
          compress: {
            collapse_vars: true,
            dead_code: true,
            drop_debugger: true
          },
          preserveComments: false,
          quoteStyle: 1
        },
        files: [{
          expand: true,
          src: '*.js',
          dest: 'destino/js',
          cwd: 'origen/js',
          ext: '.min.js'
        }]
      }
    },

    copy: {
      dev: {
        options: {
          //
        },
        files: [{
          expand: true,
          flatten: true,
          src: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/bootstrap-validator/dist/validator.min.js'
          ],
          dest: 'destino/js/vendor/',
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'origen/js/vendor',
          src: ['*.js'],
          dest: 'destino/js/vendor'
        },
        {
          expand: true,
          cwd: 'origen/',
          src: ['*.html'],
          dest: 'destino/'
        }]
      }
    },

    less: {
      dev: {
        options: {
          paths: ['origen/css'],
          compress: true,
          strictImports: true,
          syncImport: true,
          sourceMap: false
        },
        files: {
          'destino/css/style.min.css': ['origen/css/style.less']
        }
      }
    },

    watch: {
      css: {
        files: ["origen/css/*.less"],
        tasks: ["less"],
        options: {
          livereload: true
        }
      },
      js: {
        files: ["origen/js/*.js"],
        tasks: ["uglify"],
        options: {
          livereload: true
        }
      },
      html: {
        files: ["origen/*.html"],
        tasks: ["copy"],
        options: {
          livereload: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify','less', 'copy','watch']);

};