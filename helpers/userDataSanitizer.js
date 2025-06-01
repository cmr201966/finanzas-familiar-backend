export const sanitizeUserData = (userData) => {
    // Lista de campos que queremos mantener
    const allowedFields = ['id', 'name', 'email', "phone", 'createdAt', 'updatedAt'];

    // Si es un solo objeto
    if (typeof userData === 'object' && !Array.isArray(userData)) {
        return allowedFields.reduce((acc, field) => {
            if (userData[field] !== undefined) {
                acc[field] = userData[field];
            }
            return acc;
        }, {});
    }

    // Si es un array de objetos
    if (Array.isArray(userData)) {
        return userData.map(user => sanitizeUserData(user));
    }

    // Si no es ni objeto ni array, devolvemos el mismo dato
    return userData;
};
