/**
 * @module routers/packagesAPI
 * @description This module handles the routing for managing package records. 
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Express module.
 * @const
 */
const express = require("express");

/**
 * Controller for package-related operations.
 * @const
 */
const packagesController = require("../controllers/packagesController");

/**
 * Middleware to check if the user is authenticated.
 * @const
 */
const { checkAuthenticationAPI } = require("../helper");

/**
 * Express Router to define routes for package management.
 * @const
 */
const router = express.Router();

/**
 * Retrieves a list of all packages. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name GET /packages
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON containing all package records.
 */
router.get("/", packagesController.getAllPackages);

/**
 * Adds a new package to the system. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name POST /packages/add
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.body.package_title - The title of the new package.
 * @param {number} req.body.package_weight - The weight of the new package.
 * @param {string} req.body.package_destination - The destination of the new package.
 * @param {string} req.body.package_description - The description of the new package (optional).
 * @param {boolean} req.body.isAllocated - Whether the package is allocated to a driver.
 * @param {string} req.body.driver_id - The ID of the driver to whom the package is allocated (if any).
 * @returns {Object} JSON containing the newly added package's ID.
 */
router.post("/add", packagesController.addPackage);

/**
 * Deletes a package by its ID. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name DELETE /packages/delete/:id
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.params.id - The ID of the package to be deleted.
 * @returns {Object} JSON indicating success or failure of the deletion.
 */
router.delete("/delete/:id", packagesController.removePackageById);

/**
 * Updates the destination of a package by its ID. This route is protected and can only be accessed if the user is authenticated.
 * 
 * @name PUT /packages/update
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.body.package_id - The ID of the package to be updated.
 * @param {string} req.body.package_destination - The new destination of the package.
 * @returns {Object} JSON indicating success or failure of the update.
 */
router.put("/update", packagesController.updatePackageById);

module.exports = router;