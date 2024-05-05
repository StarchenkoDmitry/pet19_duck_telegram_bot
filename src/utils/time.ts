export function addExpiryDate<T>(value: T, ttl?: number) {
    if (ttl !== undefined && ttl < Infinity) {
        const now = Date.now();
        return { session: value, expires: now + ttl };
    } else {
        return { session: value };
    }
}
