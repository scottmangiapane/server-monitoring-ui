module.exports = {
    devServer: {
        proxy: {
            '/api': {
                pathRewrite: { '^/api': '/' },
                target: process.env.API_TARGET
            }
        }
    }
}