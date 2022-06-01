const glob = require("glob");
const sass = require('node-sass');

const BUILD_PATH = './assets/build/';
const SRC_PATH = './assets/src/';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            customizer: {
                src: [
                    'modules/customizer/assets/responsive-control.js',
                    'modules/customizer/custom-control/buttonset/assets/script.js',
                    'modules/customizer/custom-control/color-picker/assets/script.js',
                    'modules/customizer/custom-control/dimension/assets/script.js',
                    'modules/customizer/custom-control/icon-select/assets/script.js',
                    'modules/customizer/custom-control/page-repeater/assets/script.js',
                    'modules/customizer/custom-control/radio-image/assets/script.js',
                    'modules/customizer/custom-control/range/assets/script.js',
                    'modules/customizer/custom-control/reset/assets/script.js',
                    'modules/customizer/custom-control/selection-order/assets/script.js',
                    'modules/customizer/custom-control/slider/assets/script.js',
                    'modules/customizer/custom-control/toggle/assets/script.js',
                ],
                dest: BUILD_PATH + 'js/customizer.js',
            }
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: false,
                style: 'compact'
            },
            style: {
                files: (function () {
                    var filesArr = glob.sync(SRC_PATH + 'scss/*.scss');
                    return filesArr.reduce((acc, srcFile) => {
                        var outputFile = srcFile.replace('src', 'build').replace('.scss', '.css').replace('/scss/', '/css/');;
                        acc[outputFile] = srcFile;
                        return acc;
                    }, {})
                })()
            },
            plugins: {
                files: (function () {
                    var filesArr = glob.sync(SRC_PATH + 'plugins/**/*.scss');
                    return filesArr.reduce((acc, srcFile) => {
                        var outputFile = srcFile.replace('src', 'build').replace('.scss', '.css').replace('/scss/', '/css/');;
                        acc[outputFile] = srcFile;
                        return acc;
                    }, {})
                })()
            }
        },

        copy: {

            vendor: {
                files: [
                    {
                        expand: true,
                        cwd: SRC_PATH + 'vendors/',
                        src: '**',
                        dest: BUILD_PATH + 'vendors/',
                        filter: 'isFile'
                    }
                ],
            },

            staticFiles: {
                files: [
                    {
                        expand: true,
                        cwd: SRC_PATH + 'img/',
                        src: '**',
                        dest: BUILD_PATH + 'img/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: SRC_PATH + 'fonts/',
                        src: '**',
                        dest: BUILD_PATH + 'fonts/',
                        filter: 'isFile'
                    }
                ],
            },

            js: {
                files: [
                    {
                        expand: true,
                        cwd: SRC_PATH + 'js/',
                        src: '*.js',
                        dest: BUILD_PATH + 'js/',
                        filter: 'isFile'
                    },
                ],
            },

            plugins: {
                files: [
                    {
                        expand: true,
                        cwd: SRC_PATH + 'plugins/',
                        src: '**/*.js',
                        dest: BUILD_PATH + 'plugins/',
                        filter: 'isFile'
                    },
                ],
            },

            deploy: {
                files: [
                    {
                        expand: true,
                        src: ['*', '!*.js', '!*.gitignore', '!*.json'],
                        dest: './deploy/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        src: ['./modules/**', '!./modules/**/**/*.scss', '!./modules/**/**/*.js', '!./modules/**/**/**/*.scss', '!./modules/**/**/**/*.js'],
                        dest: './deploy/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        src: ['./page-templates/**'],
                        dest: './deploy/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        src: ['./template-parts/**'],
                        dest: './deploy/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        src: ['./assets/build/**'],
                        dest: './deploy/',
                        filter: 'isFile'
                    },
                ],
            }


        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: (function () {
                    const pluginFiles = glob.sync(BUILD_PATH + 'plugins/**/*.js');
                    const otherJsFiles = glob.sync(BUILD_PATH + 'js/*.js');
                    const allFiles = [...pluginFiles, ...otherJsFiles];
                    return allFiles.reduce((acc, srcFile) => {
                        var outputFile = srcFile.replace('.js', '.min.js');
                        acc[outputFile] = srcFile;
                        return acc;
                    }, {})
                })()
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: (function () {
                    const pluginFiles = glob.sync(BUILD_PATH + 'plugins/**/*.css');
                    const otherJsFiles = glob.sync(BUILD_PATH + 'css/*.css');
                    const allFiles = [...pluginFiles, ...otherJsFiles];
                    return allFiles.reduce((acc, srcFile) => {
                        var outputFile = srcFile.replace('.css', '.min.css');
                        acc[outputFile] = [srcFile];
                        return acc;
                    }, {})
                })()
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
            },
            style: {
                expand: true,
                flatten: true,
                src: BUILD_PATH + 'css/*.css',
                dest: BUILD_PATH + 'css/'
            },
            plugins: {
                files: (function () {
                    const pluginFiles = glob.sync(BUILD_PATH + 'plugins/**/*.css');
                    return pluginFiles.reduce((acc, srcFile) => {
                        const config ={
                            expand: true,
                            flatten: true,
                            src: srcFile,
                            dest: srcFile.split('/').slice(0, -1).join('/')
                        }
                        acc.push(config)
                        return acc;
                    }, [])
                })()
            },
        },

        watch: {

            scss: {
                files: [
                    './modules/**/*.scss',
                    './modules/**/**/*.scss',
                    './modules/**/**/**/*.scss',
                    './modules/**/**/**/**/*.scss',

                    SRC_PATH + 'scss/**/*.scss',
                    SRC_PATH + 'scss/**/**/*.scss',
                    SRC_PATH + 'scss/**/**/**/*.scss',
                    SRC_PATH + 'scss/**/**/**/**/*.scss',
                ],
                tasks: ['sass:style', 'autoprefixer:style']
            },

            staticFiles: {
                files: [
                    SRC_PATH + 'fonts/*',
                    SRC_PATH + 'img/*',
                ],
                tasks: ['copy:staticFiles'],
            },
            js: {
                files: [
                    SRC_PATH + 'js/*.js',
                ],
                tasks: ['copy:js']
            },

            /* Plugin files watch */
            pluginJs: {
                files: [
                    SRC_PATH + 'plugins/**/*.js'
                ],
                tasks: ['copy:plugins']
            },
            pluginScss: {
                files: [
                    SRC_PATH + 'plugins/**/*.scss'
                ],
                tasks: ['sass:plugins', 'autoprefixer:plugins']
            },

            /* Customizer files watch */
            customizerJs: {
                files: [
                    'modules/**/*.js',
                    'modules/**/**/*.js',
                    'modules/**/**/**/*.js',
                    'modules/**/**/**/**/*.js',
                ],
                tasks: ['concat']
            }

        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task(s)
    grunt.registerTask('default', ['concat', 'sass', 'copy:vendor', 'copy:staticFiles', 'copy:js', 'copy:plugins', 'autoprefixer']);
    grunt.registerTask('staticFiles', ['copy:staticFiles']);
    grunt.registerTask('minify', ['uglify', 'cssmin']);
    grunt.registerTask('build', ['default', 'minify']);

};
