import { resError } from '../helpers/response.js';

export default function validateSchema(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const { issues } = result.error;
            const details = issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message }));
            return resError(res, { status: 400, message: 'Datos inválidos', details });
        }
        
        req.body = result.data;
        next()
    }
}