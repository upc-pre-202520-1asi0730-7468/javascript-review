import {ValidationError} from "./errors.js";

/**
 * DateTime Value Object
 *
 * @remarks
 * This class represents a date and time value object. It encapsulates a JavaScript Date object
 * and provides methods for comparison and formatting.
 *
 * @example
 * const dateTime1 = new DateTime('2023-10-05T14:48:00.000Z');
 * const dateTime2 = new DateTime(new Date());
 * console.log(dateTime1.toISOString());
 * console.log(dateTime1.equals(dateTime2));
 *
 * @author Web Application Development Team
 * @version 1.0.0
 */
export class DateTime {
    #date;

    /**
     * Creates a new DateTime instance.
     * @param {Date | string} [date=new Date()] - The date to encapsulate. Can be a Date object or an ISO 8601 string. If not provided, defaults to the current date and time.
     * @throws {ValidationError} If the provided date is invalid.
     */
    constructor(date = new Date()) {
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate.getTime()))
            throw new ValidationError(`Invalid date format: ${date}`);
        this.#date = parsedDate;
    }

    /**
     * Gets the encapsulated Date object.
     * @returns {Date} The encapsulated Date object.
     */
    get date() {
        return this.#date;
    }

    /**
     * Returns the ISO 8601 string representation of the date.
     * @returns {string} The ISO 8601 string representation of the date.
     */
    toISOString() {
        return this.#date.toISOString();
    }

    /**
     * Returns a human-readable string representation of the date and time.
     * @example
     * const dateTime = new DateTime('2023-10-05T14:48:00.000Z');
     * console.log(dateTime.toString()); // "October 5, 2023, 02:48 PM"
     * @returns {string} A human-readable string representation of the date and time.
     */
    toString() {
        let options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        };
        return this.#date.toLocaleDateString('en-US', options);
    }

    /**
     * Compares this DateTime instance with another for equality.
     * Two DateTime instances are considered equal if they represent the same point in time.
     * @param {DateTime} other - The other DateTime instance to compare with.
     * @returns {boolean} True if both DateTime instances represent the same point in time, false otherwise.
     */
    equals(other) {
        return other instanceof DateTime &&
            this.#date.getTime() === other.#date.getTime();
    }

}