var mongoHost = '127.0.0.1';
var mongoPort = '27017';
var mongoUserName = '';
var mongoPassword = '';
var mongoDBName = 'wowsome';
var mongoCollectionName = "user"

module.exports = {
    mongoConfig: {
        uri: 'mongodb://localhost:27017/wowsome',
        options: {
            db: {
                native_parser: true
            },
            server: {
                auto_reconnect: true
            },
            mongos: {
                poolSize: 15,
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 30000
                }
            }
        }
    },
}