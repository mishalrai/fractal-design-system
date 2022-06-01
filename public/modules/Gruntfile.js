const glob = require('glob');
const sass = require('node-sass');

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
                    var componentScssFiles = glob.sync('components/**/*.scss');
                    return componentScssFiles.reduce( (acc, srcFile)=>{
                        const file = srcFile.split('/').slice(-2).join('/');
                        const outputFile = `public/modules/${file}`;
                        acc[outputFile] = srcFile;
                        console.log(acc, 'acc');
                        return acc;
                    }, {});
                })()
            }
        },
        copy:{
            components:{
                expand: true,
                CED: 'components/',
                src: '**/*.js',
                dest: 'public/modules/',
                // src: (function(){
                //     const componentJsFiles
                // })(),
                // dest: (function(){

                // }),
                filter: 'isFile'
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['sass', 'copy']);
};