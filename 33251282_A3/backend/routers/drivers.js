/**
 * @module routers/drivers
 * @description This module handles the routing for managing drivers in the application. 
 * It includes functionality for listing, filtering, adding, and deleting drivers.
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 * 
 * @requires express - The Express framework for building web applications.
 * @requires path - Node.js module for handling and transforming file paths.
 * @requires ../classes/driver - Custom Driver class for creating driver instances.
 */

/**
 * Express module.
 * @const
 */
const express = require("express");

/**
 * Driver module.
 * @const
 */
const Driver = require("../models/driver");

/**
 * Package module.
 * @const
 */
const Package = require("../models/package");

/**
 * Function to increment CRUD operations counter.
 * @const
 */
const { incrementCRUDCounter } = require("../firestoreHelper");

/**
 * Middleware to check if the user is authenticated.
 * @const
 */
const { checkAuthentication } = require("../helper");

/**
 * Router instance.
 * @const
 */
const router = express.Router();

/** 
 * Available departments for drivers.
 * @const
 * @type {string[]} 
 */
const departmentDB = ["Food", "Furniture", "Electronic"];

/**
 * Route to display the list of all drivers.
 * @name get/
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/", checkAuthentication, async function(req, res) {
    let driversDB = await Driver.find({});
    await incrementCRUDCounter("retrieve");
    res.render("drivers_list", {driversDB: driversDB});
})

/**
 * Route to display the filter options for drivers based on department.
 * @name get/filter
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/filter", checkAuthentication, function(req, res) {
    res.render("drivers_filter", {departmentDB: departmentDB});
})

/**
 * Route to display the list of drivers filtered by department.
 * @name get/filter-by
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/filter-by", checkAuthentication, async function(req, res) {
    let department = req.query.department;
    let driversDB = await Driver.find({});
    await incrementCRUDCounter("retrieve");
    res.render("drivers_filter_department", {driversDB: driversDB, department: department});
})

/**
 * Route to display the form for adding a new driver.
 * @name get/add
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/add", checkAuthentication, function(req, res) {
    res.render("drivers_add", {departmentDB: departmentDB});
})

/**
 * Route to handle the submission of a new driver, and redirects to list all drivers.
 * @name post/add
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post("/add", checkAuthentication, async function(req, res) {
    let driverName = req.body.driverName;
    let department = req.body.department;
    let licence = req.body.licence;
    let isActive = req.body.isActive;

    let aDriver = new Driver({name: driverName, department: department, licence: licence, isActive: isActive});
    await aDriver.save();
    await incrementCRUDCounter("create");

    res.redirect("/33251282/Zhi'En/drivers");
})

/**
 * Route to display the form for deleting a driver by ID.
 * @name get/delete
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/delete", checkAuthentication, function(req, res) {
    res.render("drivers_delete");
})

/**
 * Route to handle the deletion of a driver by ID.
 * @name get/delete-req
 * @function
 * @memberof module:routers/drivers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/delete-req", checkAuthentication, async function(req, res) {
    let id = req.query.driverId;

    if (!id) {
        return res.render("invalid_data");
    }

    let theDriver = await Driver.findOne({id: id});
    let assignedPackages = theDriver.assignedPackages;
    assignedPackages.forEach(async pkg => {
        await Package.findOneAndDelete({_id: pkg._id});
    });
    await Driver.deleteOne({id: id}); 
    await incrementCRUDCounter("delete");
    res.redirect("/33251282/Zhi'En/drivers");    
})

/**
 * Exports the router and the drivers database.
 * @type {Object}
 * @property {Object} driversRouter - Express router for drivers.
 */
module.exports = router;