module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      test: {
        src: 'build/*'
      }
    },
    copy: {
      html: {
        expand: true,
        src: '*.html',
        dest: 'build'
      },
      css: {
        expand: true,
        src: ['css/framework7.ios.min.css','css/framework7.ios.colors.min.css'],
        dest: 'build'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
      },
      build: {
        expand: true,
        src: "js/*.js",
        dest: 'build',
        ext: '.min.js'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: "css/my-app.css",
          dest: 'build',
          ext: '.min.css'
        }]
      }
    },
    // htmlmin: {
    //   dest: {
    //     options: {
    //       removeComments: true,
    //       collapseWhitespace: true,
    //       removeEmptyAttributes: true,
    //       removeRedundantAttributes: true
    //     },
    //     files:{
    //       './build/demo.html': 'demo.html'
    //     }
    //   }
    // },
    connect: {
      options: {
        port: 3000,
        open: {
          target: 'http://localhost:3000',
          appName: 'chrome',
          callback: function () {

          }
        },
        hostname: 'localhost',
        keepalive: true,
        livereload: 35729,
        base: {
          path: 'build',
          options: {
            index: 'demo.html'
          }
        }
      },
      server: {
        base: '.'
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:test','copy:html','copy:css','uglify:build', 'cssmin', 'connect']);
}