import {ValidationError} from "./errors.js";
import {Currency} from "./currency.js";

/**
 * Money value object representing an amount in a specific currency.
 *
 * @remarks
 * This class is immutable. All operations that would modify the amount or currency
 * return a new instance of Money. It supports addition and multiplication operations.
 *
 * @example
 * ```javascript
 * const usd = new Currency('USD', 'United States Dollar', '$');
 * const money1 = new Money({ amount: 100, currency: usd });
 * const money2 = new Money({ amount: 50, currency: usd });
 * const total = money1.add(money2); // Money { amount: 150, currency: usd }
 * const doubled = money1.multiply(2); // Money { amount: 200, currency: usd }
 * ```
 *
 * @author Web Application Development Team
 * @version 1.0.0
 */
export class Money {
    #amount
    #currency

    /**
     * Creates a new Money instance.
     * @param {number} amount - The monetary amount (must be a positive number).
     * @param {Currency} currency - The currency of the amount (must be an instance of Currency).
     * @throws {ValidationError} If the amount is not a positive number, or if the currency is not a Currency instance.
     */
    constructor({ amount, currency }) {
        if (!Number.isFinite(amount) || amount < 0)
            throw new ValidationError(`Amount must be a positive number`);
        if(!(currency instanceof Currency))
            throw new ValidationError(`Currency must be an instance of Currency`);
        this.#amount = Number(amount.toFixed(2)); // round to 2 decimal places
        this.#currency = currency
    }

    /**
     * Gets the monetary amount.
     * @returns {number} The monetary amount.
     */
    get amount() {
        return this.#amount;
    }

    /**
     * Gets the currency of the amount.
     * @returns {Currency} The currency of the amount.
     */
    get currency() {
        return this.#currency;
    }

    /**
     * Adds another Money instance to this one.
     * @param {Money} other - The other Money instance to add (must have the same currency).
     * @return {Money} A new Money instance representing the sum of the two amounts.
     * @throws {ValidationError} If the other Money instance has a different currency.
     */
    add(other) {
        if (!(other instanceof Money) || !this.#currency.equals(other.currency))
            throw new ValidationError(`Can only add Money with the same currency`);
        return new Money({ amount: this.#amount + other.amount, currency: this.#currency });
    }

    /**
     * Multiplies the monetary amount by a positive number.
     * @param {number} multiplier - The positive number to multiply the amount by.
     * @returns {Money} A new Money instance representing the multiplied amount.
     * @throws {ValidationError} If the multiplier is not a positive number.
     */
    multiply(multiplier) {
        if (!Number.isFinite(multiplier) || multiplier < 0)
            throw new ValidationError(`Multiplier must be a positive number`);
        return new Money({ amount: this.#amount * multiplier, currency: this.#currency });
    }

    /**
     * Checks if this Money instance is equal to another.
     * @param {Money} other - The other Money instance to compare with.
     * @returns {boolean} True if both Money instances have the same amount and currency, false otherwise.
     */
    equals(other) {
        return other instanceof Money && this.#amount === other.amount && this.#currency.equals(other.currency);
    }

    /**
     * Returns a string representation of the Money instance.
     * @returns {string} A string in the format "CURRENCY_CODE AMOUNT", e.g., "USD 100.00".
     */
    toString() {
        return `${this.#currency.code} ${this.#amount.toFixed(2)}`;
    }
}