import { loadEnvFile } from "node:process";

loadEnvFile(process.cwd() + '/.env')

export const config = {
    db: {
        port: process.env.PORT,
    },
    secret_key_jwt: process.env.SECRET_KEY_JWT,
};

