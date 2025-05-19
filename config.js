import { config } from 'dotenv'
import { join } from 'path';
import { cwd } from 'process';

config()

export const Config = {
    db: {
        path: join(cwd(), '/db/finanzas.db')
    },
    server: {
        port: process.env.PORT,
    },
    secret_key_jwt: process.env.SECRET_KEY_JWT,
};

