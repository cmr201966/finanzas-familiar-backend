export function resSuccess(res, { status = 200, message, data = {} }) {
    res.status(status).json({
        success: true,
        code: status,
        message,
        data
    });
}


export function resError(res, { status = 400, message, details = {} }) {
    res.status(status).json({
        success: false,
        code: status,
        message,
        error: {
            details
        }
    });
}