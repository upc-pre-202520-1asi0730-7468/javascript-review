import {generateUUID, isValidUUID} from "./uuid.js";
import {ValidationError} from "./errors.js";

/**
 * SupplierId value object
 *
 * @remarks
 * A SupplierId is a unique identifier for a supplier. It is represented as a UUID string.
 *
 * @example
 * const supplierId = new SupplierId('550e8400-e29b-41d4-a716-446655440000');
 * console.log(supplierId.value); // '550e8400-e29b-41d4-a716-446655440000'
 * console.log(supplierId.toString()); // '550e8400-e29b-41d4-a716-446655440000'
 * const anotherSupplierId = SupplierId.generate();
 *
 * @author Web Application Development Team
 * @version 1.0.0
 */
export class SupplierId {
    #value;

    /**
     * Creates a new SupplierId
     * @param {string} value - The UUID string representing the SupplierId
     * @throws {ValidationError} If the value is not a valid UUID
     */
    constructor(value) {
        if(!isValidUUID(value))
            throw new ValidationError(`Invalid SupplierId: ${value}`);
        this.#value = value;
    }

    /**
     * Gets the value of the SupplierId
     * @returns {string} The UUID string representing the SupplierId
     */
    get value() {
        return this.#value;
    }

    /**
     * Returns the string representation of the SupplierId
     * @returns {string} The UUID string representing the SupplierId
     */
    toString() {
        return this.#value;
    }

    /**
     * Compares this SupplierId to another for equality
     * @param {SupplierId} other - The other SupplierId to compare to
     * @returns {boolean} True if the SupplierIds are equal, false otherwise
     */
    equals(other) {
        return other instanceof SupplierId && this.#value === other.#value;
    }

    /**
     * Generates a new SupplierId with a unique UUID
     * @returns {SupplierId} A new SupplierId instance with a unique UUID
     */
    static generate() {
        return new SupplierId(generateUUID());
    }
}