module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\r\n\r\n'
      },
      dist: {
        src: ['assets/javascripts/modules/module1.js', 'assets/javascripts/modules/module2.js'],
        dest: 'assets/javascripts/main.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'assets/javascripts/bootstrap.min.js': ['assets/javascripts/bootstrap.js'],
          'assets/javascripts/main-<%= pkg.version %>.min.js': ['assets/javascripts/angular-stuff.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          //style: 'expanded',
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'assets/scss',
          src: ['style.scss'],
          dest: 'assets/css',
          ext: '-<%= pkg.version %>.css'
        }]
      }
    },

    watch: {
      tasks: ['concat', 'uglify', /*'jshint',*/],
      css: {
        files: 'assets/style.scss',
        tasks: ['sass']
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify']
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);
};