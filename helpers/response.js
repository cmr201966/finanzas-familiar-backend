export function resSuccess(res, { status = 200, message, data = {} }) {
    res.status(status).json({
        success: true,
        message,
        data
    });
}


export function resError(res, { status = 400, message, details = {} }) {
    res.status(status).json({
        success: false,
        message,
        error: {
            code: status,
            details
        }
    });
}