import {ValidationError} from "./errors.js";

/**
 * Currency value object
 *
 * @remarks
 * Represents a currency with a specific code.
 * Valid codes are 'USD', 'EUR', 'GBP', 'JPY'.
 *
 * @author Web Application Development Team
 * @version 1.0
 */
export class Currency {
    static #VALID_CODES = ['USD', 'EUR', 'GBP', 'JPY']
    #code

    /**
     * Creates a new Currency instance.
     * @param {string} code - The currency code (e.g., 'USD', 'EUR').
     * @throws {ValidationError} If the currency code is invalid.
     */
    constructor(code) {
      if(!Currency.#VALID_CODES.includes(code))
        throw new ValidationError(`Invalid currency code: ${code}`);
        this.#code = code;
    }

    /**
     * Gets the currency code.
     * @returns {string} The currency code.
     */
    get code() {
        return this.#code;
    }

    /**
     * Checks if this currency is equal to another currency.
     * @param {Currency} other - The other currency to compare with.
     * @returns {boolean} True if the currencies are equal, false otherwise.
     */
    equals(other) {
        return other instanceof Currency && this.#code === other.code;
    }

}