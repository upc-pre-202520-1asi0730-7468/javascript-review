import {generateUUID, isValidUUID} from "./uuid.js";
import {ValidationError} from "./errors.js";

/**
 * ProductId Value Object
 *
 * @remarks
 * Represents a unique identifier for a product using UUID format.
 * Ensures the identifier is valid and provides utility methods.
 *
 * @example
 * const productId = new ProductId('550e8400-e29b-41d4-a716-446655440000');
 * console.log(productId.value); // '550e8400-e29b-41d4-a716-446655440000'
 * const newProductId = ProductId.generate();
 *
 * @author Web Application Development Team
 * @version 1.0.0
 */
export class ProductId {
    #value;

    /**
     * Creates a new ProductId instance.
     * @param {string} value - The UUID string representing the product ID.
     * @throws {ValidationError} If the provided value is not a valid UUID.
     */
    constructor(value) {
        if (!isValidUUID(value))
            throw new ValidationError(`Invalid ProductId format: ${value}. Must be a valid UUID.`);
        this.#value = value;
    }

    /**
     * Generates a new ProductId with a unique UUID.
     * @returns {ProductId} A new ProductId instance with a generated UUID.
     */
    static generate() {
        return new ProductId(generateUUID());
    }

    /**
     * Gets the value of the ProductId.
     * @returns {string} The UUID string of the ProductId.
     */
    get value() {
        return this.#value;
    }

    /**
     * Returns the string representation of the ProductId.
     * @returns {string} The UUID string of the ProductId.
     */
    toString() {
        return this.#value;
    }

    /**
     * Compares this ProductId with another for equality.
     * @param {ProductId} other - The other ProductId to compare with.
     * @returns {boolean} True if both ProductIds are equal, false otherwise.
     */
    equals(other) {
        return other instanceof ProductId && this.#value === other.value;
    }
}