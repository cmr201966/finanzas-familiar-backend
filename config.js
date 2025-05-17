import { config } from 'dotenv'

config()

export const config = {
    server: {
        port: process.env.PORT,
    },
    secret_key_jwt: process.env.SECRET_KEY_JWT,
};

