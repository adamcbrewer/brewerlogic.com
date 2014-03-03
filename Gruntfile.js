'use strict';

var request = require('request');

module.exports = function (grunt) {
    var reloadPort = 35729, files;

    grunt.loadNpmTasks('grunt-develop');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        develop: {
            server: {
                file: 'app.js'
            }
        },
        watch: {
            options: { nospawn: true },
            // runs the node server in development mode
            server: {
                files: [
                    'app.js',
                    'routes/*.js'
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            js: {
                files: ['assets/js/*.js'],
                options: { livereload: true },
                tasks: ['uglify:development']
            },
            less: {
                files: ['assets/css/less/*.less'],
                options: { livereload: true },
                tasks: ['less:development']
            }
        },
        less: {
            development: {
                options: {
                    yuicompress: false,
                    compress: false
                },
                files: [
                    {
                        src: ['assets/css/less/core.less'],
                        dest: 'assets/css/core.css'
                    }
                ]
            },
            production: {
                options: {
                    yuicompress: true,
                    compress: true
                },
                files: [
                    {
                        src: ['assets/css/less/core.less'],
                        dest: 'assets/css/core.css'
                    }
                ]
            }
        },
        uglify: {

            // Development-level code
            development: {
                options: {
                    banner: '/*!\n' +
                        ' * <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd H:MM:ss") %>\n' +
                        ' * Development Build\n' +
                        ' * https://github.com/brewerlogic.com\n *\n' +
                        ' */\n',
                    compress: false,
                    preserveComments: true,
                    mangle: false,
                    beautify: true,
                    report: 'min'
                },
                files: [
                    {
                        src: [
                            'assets/js/libs/zepto.js',
                            'assets/js/libs/imagesloaded.js',
                            'assets/js/script.js'
                        ],
                        dest: 'assets/js/build.js'
                    }
                ]
            },

            // Production-level code
            production: {
                options: {
                    banner: '/*!\n' +
                        ' * <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd H:MM:ss") %>\n' +
                        ' * Production Build\n' +
                        ' * https://github.com/brewerlogic.com\n *\n' +
                        ' */\n',
                    compress: true,
                    preserveComments: false,
                    mangle: false,
                    report: 'min'
                },
                files: [
                    {
                        src: [
                            'assets/js/libs/zepto.js',
                            'assets/js/libs/imagesloaded.js',
                            'assets/js/script.js'
                        ],
                        dest: 'assets/js/build.min.js'
                    }
                ]
            }
        }
    });

    grunt.config.requires('watch.server.files');
    files = grunt.config('watch.server.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded)
                    grunt.log.ok('Delayed live reload successful.');
                else
                    grunt.log.error('Unable to make a delayed live reload.');
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('default', [
        // 'develop',
        'watch'
    ]);
    grunt.registerTask('build', [
        'uglify:production',
        'less:production'
    ]);
};
