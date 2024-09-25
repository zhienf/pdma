/**
 * Package Model.
 * @module models/package
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Mongoose module.
 * @const
 */
const mongoose = require('mongoose');

/**
 * Generate a unique package ID in the format "PAA-ZF-###".
 * 
 * @function generatePackageId
 * @returns {string} The generated package ID.
 */
function generatePackageId() {
    let randAlpha1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    let randAlpha2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    let randNum1 = Math.floor(Math.random()*10);
    let randNum2 = Math.floor(Math.random()*10);
    let randNum3 = Math.floor(Math.random()*10);
    let id = `P${randAlpha1}${randAlpha2}-ZF-${randNum1}${randNum2}${randNum3}`;
    return id;
}

/**
 * Package Schema for MongoDB using Mongoose.
 * Represents a package with relevant fields such as title, weight, destination, and assigned driver.
 * 
 * @typedef {Object} Package
 * @property {string} id - Unique identifier for the package, generated using `generatePackageId()`.
 * @property {string} title - The title of the package (required, alphanumeric, 3-15 characters).
 * @property {number} weight - The weight of the package (required, must be positive).
 * @property {string} destination - The destination for the package (required, alphanumeric, 5-15 characters).
 * @property {string} description - Additional description of the package (optional, max length of 30 characters).
 * @property {Date} createdAt - The date when the package was created, defaulting to the current date.
 * @property {boolean} isAllocated - Whether the package has been allocated to a driver (required).
 * @property {ObjectId} driverId - The `ObjectId` reference to the driver who is assigned to this package.
 */
const packageSchema = mongoose.Schema({
    id: {
        type: String,
        default: generatePackageId
    },
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9\s]+$/.test(v); 
            },
            message: "Title must be alphanumeric with length between 3 and 15 inclusive."
        }
    },
    weight: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0; 
            },
            message: "Weight must be a positive non-zero value."
        }
    },
    destination: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9\s]+$/.test(v); 
            },
            message: "Destination must be alphanumeric with length between 5 and 15 inclusive."
        }
    },
    description: {
        type: String,
        maxLength: 30
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAllocated: {
        type: Boolean,
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})

module.exports = mongoose.model("Package", packageSchema);