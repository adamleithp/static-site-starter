module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      html: {
        src: '_site/*.html'
      },
      js: {
        src: '_site/js/'
      },
      css: {
        src: '_site/css/'
      },
    },


    copy: {
      dist: {
        expand: true,
        cwd: 'src/',
        src: [
          'images/**/*',
          'CNAME'
        ],
        dest: '_site/',
      },
    },


    browserSync: {
      bsFiles: {
        src: '_site/**',
      },
      options: {
        watchTask: true,
        server: './_site',
        startPath: `/`,
        open: false,
        notify: false
      },
    },


    nunjucks: {
      options: {
        data: grunt.file.readJSON('data.json')
      },
      render: {
        files: [
          {
            expand: true,
            cwd: "src/html/pages/",
            src: "**/*.njk",
            dest: "_site/",
            ext: ".html",
          }
        ]
      }
    },


    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/css/",
          src: "*.scss",
          dest: "_site/css",
          ext: '.css'
        }]
      }
    },


    browserify: {
      options: {
        transform: [['babelify', { presets: "es2015" }]]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: [
            '**/*.js',
          ],
          dest: '_site/js/',
        }]
      }
    },


    watch: {
      options: {
        event: ['changed', 'added', 'deleted']
      },

      html: {
        files: [
          'src/html/**/*.njk',
        ],
        tasks: [
          'clean:html',
          'nunjucks',
        ],
      },

      css: {
        files: [
          'src/css/*.scss',
          'src/css/*.css',
        ],
        tasks: [
          'clean:css',
          'sass',
        ],
      },

      js: {
        files: [
          'src/js/**/*.js'
        ],
        tasks: [
          'clean:js',
          'browserify:dist'
        ]
      },

      images: {
        files: [
          'src/images/**'
        ],
        tasks: [
          'copy:dist'
        ]
      }
    },


    'gh-pages': {
      options: {
        base: '_site'
      },
      src: ['**']
    }
  });

  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('default', [
    'clean:html',
    'clean:js',
    'clean:css',
    'nunjucks',
    'sass:dist',
    'browserify:dist',
    'copy:dist',
    'browserSync',
    'watch',
  ]);

  grunt.registerTask('deploy', [
    'clean:html',
    'clean:js',
    'clean:css',
    'nunjucks',
    'sass:dist',
    'browserify:dist',
    'copy:dist',
    'gh-pages'
  ]);
}
