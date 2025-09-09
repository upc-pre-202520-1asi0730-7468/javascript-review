/**
 * Validate if the given string is a valid email address.
 * @param {string} email
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
