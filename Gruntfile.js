module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rsync');

    var credentials = grunt.file.readJSON('credentials.json');

    grunt.initConfig({
        screeps: {
            options: {
                server: credentials.server,
                email: credentials.email,
                password: credentials.password,
                branch: 'cheaper-path',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['clean','copy','screeps']
            }
        },

        copy: {
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize dots for folders
                        return dest + src.replace(/\//g,'.');
                    }
                }]
            }
        },

        clean: {
            'dist': ['dist']
        }

    });

    grunt.registerTask('default', ['clean','copy','screeps']);
};
