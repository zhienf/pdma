/**
 * @module routers/driversAPI
 * @description This module handles the routing for managing drivers record. 
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Express module.
 * @const
 */
const express = require("express");

/**
 * Controller for driver-related operations.
 * @const
 */
const driversController = require("../controllers/driversController");

/**
 * Middleware to check if the user is authenticated.
 * @const
 */
const { checkAuthenticationAPI } = require("../helper");

/**
 * Express Router to define routes for driver management.
 * @const
 */
const router = express.Router();

/**
 * Retrieves a list of all drivers. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name GET /drivers
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON containing all driver records.
 */
router.get("/", checkAuthenticationAPI, driversController.getAllDrivers);

/**
 * Adds a new driver to the system. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name POST /drivers/add
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.body.driver_name - The name of the new driver.
 * @param {string} req.body.driver_department - The department of the new driver.
 * @param {string} req.body.driver_licence - The driver's licence.
 * @param {boolean} req.body.driver_isActive - Whether the driver is active or not.
 * @returns {Object} JSON containing the newly added driver's ID.
 */
router.post("/add", checkAuthenticationAPI, driversController.addDriver);

/**
 * Deletes a driver by their ID. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name DELETE /drivers/delete
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.query.id - The ID of the driver to be deleted.
 * @returns {Object} JSON indicating success or failure of the deletion.
 */
router.delete("/delete", checkAuthenticationAPI, driversController.removeDriverById);

/**
 * Updates the licence and department of a driver by their ID. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name PUT /drivers/update
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.body.id - The ID of the driver to be updated.
 * @param {string} req.body.driver_licence - The new licence of the driver.
 * @param {string} req.body.driver_department - The new department of the driver.
 * @returns {Object} JSON indicating success or failure of the update.
 */
router.put("/update", checkAuthenticationAPI, driversController.updateDriverById);

module.exports = router;