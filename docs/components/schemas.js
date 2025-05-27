import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

// Leer archivos JSON
const expenses = JSON.parse(readFileSync(join(cwd(), './docs/components/paths/expenses.json'), 'utf8'));
const auth = JSON.parse(readFileSync(join(cwd(), './docs/components/paths/auth.json'), 'utf8'));
const accounts = JSON.parse(readFileSync(join(cwd(), './docs/components/paths/accounts.json'), 'utf8'));

// Definir esquemas base
const baseSchemas = {
    ResponseSuccess: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            code: {
                type: "integer",
                example: 200
            },
            message: { type: "string" },
            data: {
                type: "object"
            }
        }
    },
    ResponseError: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            code: {
                type: "integer",
                example: 400
            },
            message: {
                type: "string"
            },
            error: {
                type: "object",
                properties: {
                    details: {
                        type: "object"
                    }
                },
            }
        },
        required: ["success", "message", "error"]
    }
};


export const schemas = {
    ...baseSchemas,
    ...expenses,
    ...auth,
    ...accounts,
};