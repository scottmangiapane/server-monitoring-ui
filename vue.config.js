module.exports = {
    devServer: {
        proxy: {
            '/api': {
                pathRewrite: { '^/api': '/' },
                target: process.env.VUE_APP_API
            }
        }
    }
}