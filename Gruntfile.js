/*global module:false*/
module.exports = function(grunt) {

    //timing
    require('time-grunt')(grunt);

    //handles plugins
    require('jit-grunt')(grunt);

    var webpack = require('webpack');
    var webpackConfig = require("./webpack.config.js");

    var excludedFiles = ['!node_modules/**', '!build/**', '!Gruntfile.js', '!package.json', '!README','!.git','!.git/**'];

    // Project configuration.
    grunt.initConfig({

        clean: {
            build: ['build/'],
        },

        preprocess: {

            html: {
                files: [
                    {expand: true, cwd: 'emails/', src: ['**/*.html'], dest: 'build/'},
                ],
                options: {
                    context : {
                        debug: true,
                        development: true
                    }
                }
            },

            production: {
                files: [
                    {expand: true, cwd: 'emails/', src: ['**/*.html'], dest: 'build/'},
                ],
                options: {
                    context : {
                        production: true,
                        PRODUCTION: true
                    }
                }
            },

        },

        stylus: {
            options: {
                paths: ['./css']
            },
            development: {
                options: {
                    compress: false
                },
                files: [{expand: true, cwd: 'emails/', src: ['**/*.styl'], dest: 'build/', ext:'.css'}],
            },

            production: {
                options: {
                    compress: true
                },
                files: [{expand: true, cwd: 'emails/', src: ['**/*.styl'], dest: 'build/', ext:'.css'}],
            }
        },

        csso: {
            production: {
                report: 'min',
                files: [{expand: true, cwd: 'build/', src: ['**/*.css'], dest:'build/'}],
            }
        },

        emailBuilder: {
            production:{
                options: {
                    preserveMediaQueries: true,
                },
                files : [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*.html'],
                    dest: 'build/',
                }]
            }
        },

        uncss: {
            production: {
                files : [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*.html'],
                    dest: 'build/',
                    ext: '.css'
                }],
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['emails/**/*.html', 'templates/**/*.html'],
                tasks: ['preprocess:html']
            },
            stylus: {
                files: ['css/**/*.styl'],
                tasks: ['stylus:development']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['webpack:development']
            },
            static: {
                files: ['static/**/*'],
                tasks: ['rsync:static']
            }
        }
    });


    grunt.registerTask('preprocess:development', ['preprocess:html']);

    grunt.registerTask('dev', ['clean', 'preprocess:development', 'stylus:development']);
    grunt.registerTask('debug', ['dev', 'watch']);

    grunt.registerTask('default', ['production']);

    // production environment
    grunt.registerTask('production', ['clean', 'preprocess:production', 'stylus:production', 'uncss:production', 'csso', 'emailBuilder:production']);

};

