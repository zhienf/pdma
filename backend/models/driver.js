/**
 * Driver Model.
 * @module models/driver
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Mongoose module.
 * @const
 */
const mongoose = require('mongoose');

/**
 * Generate a unique driver ID in the format "D##-33-AAA".
 * 
 * @function generateDriverId
 * @returns {string} The generated driver ID.
 */
function generateDriverId() {
    let randNum1 = Math.floor(Math.random()*10);
    let randNum2 = Math.floor(Math.random()*10);
    let randAlpha1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    let randAlpha2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    let randAlpha3 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    let id = `D${randNum1}${randNum2}-33-${randAlpha1}${randAlpha2}${randAlpha3}`;
    return id;
};

/**
 * Driver Schema for MongoDB using Mongoose.
 * Represents a driver with relevant fields such as name, department, licence, and assigned packages.
 * 
 * @typedef {Object} Driver
 * @property {string} id - Unique identifier for the driver, generated using `generateDriverId()`.
 * @property {string} name - The name of the driver (required, alphabetic, 3-20 characters).
 * @property {string} department - The department of the driver (must be "Food", "Furniture", or "Electronic").
 * @property {string} licence - The driver's licence (required, alphanumeric, exactly 5 characters).
 * @property {boolean} isActive - Indicates if the driver is currently active (required).
 * @property {Date} createdAt - The date when the driver was created, defaulting to the current date.
 * @property {ObjectId[]} assignedPackages - List of assigned packages, referencing the `Package` model.
 */
const driverSchema = mongoose.Schema({
    id: {
        type: String,
        default: generateDriverId
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s]+$/.test(v); 
            },
            message: "Name must be alphabetic with length between 3 and 20 inclusive."
        }
    },
    department: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return ['Food', 'Furniture', 'Electronic'].includes(v);
            },
            message: 'Choose between "Food", "Furniture", or "Electronic".'
        }
    },
    licence: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z0-9]{5}$/.test(v); 
            },
            message: "Licence must be alphanumeric and exactly 5 characters long."
        }
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    assignedPackages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
})

module.exports = mongoose.model("Driver", driverSchema);