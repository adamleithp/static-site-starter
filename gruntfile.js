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

      temp_folder: {
        src: '_site/css/__temp__'
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
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: "src/css/",
          src: "*.scss",
          dest: "_site/css",
          ext: '.css'
        }]
      },

      deploy: {
        files: [{
          expand: true,
          cwd: "src/css/",
          src: ["*.scss", "!global.scss"],
          dest: "_site/css",
          ext: '.css'
        }]
      },

      deploy_global_file_only: {
        files: [{
          expand: true,
          cwd: "src/css/",
          src: ["global.scss"],
          dest: "_site/css/__temp__", // make temp folder, will delete.
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
      },
      deploy: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: [
            '**/*.js',
          ],
          dest: '_site/js/',
        }],
        options: {
          transform: [
            ['babelify', { presets: "es2015" }],
            'uglifyify',
          ],
          browserifyOptions: {
              debug: true,
          }
        },
      }
    },


    htmlmin: {
      deploy: {
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },                                    // Another target
        files: [{
          expand: true,
          cwd: '_site',
          src: ['*.html'],
          dest: '_site'
        }]
      }
    },


    purifycss: {
      target: {
        src: ['_site/**/*.html', '_site/js/**/*.js'],
        css: ['_site/css/__temp__/global.css'], // take from temp folder made from sass_deploy_global
        dest: '_site/css/global.css', // place back in expected folder.
      },
    },


    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '_site/css',
          src: ['*.css'],
          dest: '_site/css'
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

      sass: {
        files: [
          'src/css/*.scss',
          'src/css/*.css',
        ],
        tasks: [
          'clean:css',
          'sass:dist',
        ],
      },

      js: {
        files: [
          'src/js/**/*.js'
        ],
        tasks: [
          'clean:js',
          'browserify:dist'
        ],
      },

      images: {
        files: [
          'src/images/**'
        ],
        tasks: [
          'copy:dist'
        ],
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
    'clean:temp_folder',
    'nunjucks',
    'sass:deploy',
    'sass:deploy_global_file_only',
    'purifycss',
    'clean:temp_folder',
    'browserify:deploy',
    'copy:dist',
    'htmlmin:deploy',
    'cssmin',
    'gh-pages'
  ]);
}
