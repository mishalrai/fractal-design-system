const glob = require('glob');
const sass = require('node-sass');

/* Source file location variables */
const scssFileLocation = 'components/**/*.scss';
const jsFileLocation = 'components/**/*.js';
const moduleFileLocation = 'public/modules/';

/* Perparing config for concat */
const componentJsfiles = glob.sync(jsFileLocation);
const concatConfig = componentJsfiles.reduce( (acc, srcFile, index)=>{
    const file = srcFile.split('/').slice(-2).join('/');
    const outputFile = moduleFileLocation + file;
    const key = `a${index}`;
    acc[key] = {
        src: [srcFile],
        dest: outputFile
    };
    return acc;
}, {});

/* Module export  */
module.exports = function( grunt ){

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                implementation: sass,
                sourceMap: false,
                style: 'compact'
            },
            components: {
                files: ( function(){
                    const componentScssFiles = glob.sync(scssFileLocation);
                    return componentScssFiles.reduce( (acc, srcFile)=>{
                        const file = srcFile.split('/').slice(-2).join('/').replace('.scss', '.css');
                        const outputFile = moduleFileLocation + file;
                        acc[outputFile] = srcFile;
                        return acc;
                    }, {});
                })()
            }
        },
       concat: concatConfig,
       watch: {
           scss:{
               files: [ scssFileLocation ],
               tasks: ['sass']
           },
           concat: {
               files: [jsFileLocation],
               tasks: ['concat']
           }
       }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'concat']);
};