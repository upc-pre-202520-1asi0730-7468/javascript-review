import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns {string} A newly generated UUID.
 */
export function generateUUID() {
    return uuidv4();
}

/**
 * Validates if the given value is a valid UUID.
 * @param {string} value - The value to validate.
 * @returns {boolean} True if the value is a valid UUID, false otherwise.
 */
export function isValidUUID(value) {
    return uuidValidate(value);
}

