import {SupplierId} from "../../../shared/domain/model/supplier-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {isValidEmail} from "../../../shared/domain/model/email.js";
import {Money} from "../../../shared/domain/model/money.js";

/**
 * Supplier aggregate root
 *
 * @remarks
 * Represents a supplier in the supply chain management bounded context.
 *
 * @property {SupplierId}   id                  - Unique identifier for the supplier.
 * @property {string}       name                - Name of the supplier (2-100 characters).
 * @property {string|null}  contactEmail        - Contact email of the supplier (valid email format or null).
 * @property {Money|null}   lastOrderTotalPrice - Total price of the last order from this supplier (Money object or null).
 *
 * @author Web Application Development Team
 * @version 1.0
 */
export class Supplier {
    #id; // Supplier ID
    #name; // string
    #contactEmail; // string with valid email format
    #lastOrderTotalPrice; // Money

    /**
     * Creates a new Supplier instance.
     * @param {Object} params - Parameters for creating a Supplier.
     * @param {SupplierId} params.id - Unique identifier for the supplier.
     * @param {string} params.name - Name of the supplier (2-100 characters).
     * @param {string|null} [params.contactEmail=null] - Contact email of the supplier (valid email format or null).
     * @param {Money|null} [params.lastOrderTotalPrice=null] - Total price of the last order from this supplier (Money object or null).
     * @throws {ValidationError} If any parameter is invalid.
     */
    constructor({ id, name, contactEmail = null, lastOrderTotalPrice = null}) {
        if (!(id instanceof SupplierId))
            throw new ValidationError('id must be a Supplier Id of SupplierId');
        if (typeof name !== 'string' || name.length < 2 || name.length > 100)
            throw new ValidationError('name must be a string between 2 and 100 characters');
        if (contactEmail !== null && (typeof contactEmail !== 'string' || !isValidEmail(contactEmail)))
            throw new ValidationError('contactEmail must be a valid email address or null');
        if (lastOrderTotalPrice !== null && (!lastOrderTotalPrice instanceof Money))
            throw new ValidationError('lastOrderTotalPrice must be a Money object or null');
        this.#id = id;
        this.#name = name;
        this.#contactEmail = contactEmail;
        this.#lastOrderTotalPrice = lastOrderTotalPrice;
    }

    /**
     * Gets the supplier's unique identifier.
     * @returns {SupplierId} The supplier's ID.
     */
    get id() {
        return this.#id;
    }

    /**
     * Gets the supplier's name.
     * @returns {string} The supplier's name.
     */
    get name() {
        return this.#name;
    }

    /**
     * Gets the supplier's contact email.
     * @returns {string|null} The supplier's contact email.
     */
    get contactEmail() {
        return this.#contactEmail;
    }

    /**
     * Sets the supplier's contact email.
     * @param {string} value - The new contact email (valid email format).
     * @throws {ValidationError} If the email is not valid.
     */
    set contactEmail(value) {
        if (value === null || ((!isValidEmail(value))))
            throw new ValidationError('contactEmail must be a valid email address');
        this.#contactEmail = value;
    }

    /**
     * Gets the total price of the last order from this supplier.
     * @returns {Money|null} The total price of the last order.
     */
    get lastOrderTotalPrice() {
        return this.#lastOrderTotalPrice;
    }

    /**
     * Sets the total price of the last order from this supplier.
     * @param {Money} value - The new total price (Money object).
     * @throws {ValidationError} If the value is not a Money object.
     */
    set lastOrderTotalPrice(value) {
        if (!value instanceof Money)
            throw new ValidationError('lastOrderTotalPrice must be a Money object');
        this.#lastOrderTotalPrice = value;
    }

}