const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(
    withSass({
        cssModules: true
    })
);

module.exports = {
    exportPathMap: function(){
        return {
            '/': { page: '/' }
        }  
    }
}