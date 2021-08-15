const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(
    withSass({
        cssModules: true
    })
);
module.exports = {
    publicRuntimeConfig: {
        NEXT_PUBLIC_API_SERVER: process.env.NEXT_PUBLIC_API_SERVER,
    },
    exportPathMap: function(){
        return {
            '/': { page: '/' }
        }
    },
    future: {webpack5: true}
}
