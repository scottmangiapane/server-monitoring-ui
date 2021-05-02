const util = require('util');
const redis = require('redis');

const redisClient = redis.createClient({
    host: 'redis'
});

const redisProxy = new Proxy(redisClient, {
    get(target, propKey, receiver) {
        return util.promisify(target[propKey]).bind(target);
    },
});

module.exports = {
    redisClient,
    redisProxy
};