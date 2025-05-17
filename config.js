const { loadEnvFile } = require("node:process")

loadEnvFile(process.cwd() + '/.env')

const config = {
    db: {
        port: process.env.PORT,
    },
    secret_key_jwt: process.env.SECRET_KEY_JWT,
};

module.exports = config;