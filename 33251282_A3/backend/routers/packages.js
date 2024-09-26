/**
 * @module routers/packages
 * @description This module handles the routing for managing packages in the application. 
 * It includes functionality for listing, adding, and deleting packages.
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 * 
 * @requires express - The Express framework for building web applications.
 * @requires path - Node.js module for handling and transforming file paths.
 * @requires ../classes/package - Custom Package class for creating package instances.
 * @requires ../routers/drivers - Array for database of drivers.
 */

/**
 * Express module.
 * @const
 */
const express = require("express");

/**
 * Package module.
 * @const
 */
const Package = require("../models/package");

/**
 * Driver module.
 * @const
 */
const Driver = require("../models/driver");

/**
 * Class representation of ObjectId type.
 * @const
 */
const { ObjectId } = require('mongodb');

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
 * Route to display the list of all packages.
 * @name get/
 * @function
 * @memberof module:routers/packages
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/", checkAuthentication, async function(req, res) {
    let packagesDB = await Package.find({}).populate("driverId");
    await incrementCRUDCounter("retrieve");
    res.render("packages_list", {packagesDB: packagesDB});
})

/**
 * Route to display the form for adding a new package.
 * The form also includes a dropdown of drivers fetched from the drivers database.
 * @name get/add
 * @function
 * @memberof module:routers/packages
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/add", checkAuthentication, async function(req, res) {
    let driversDB = await Driver.find({});
    await incrementCRUDCounter("retrieve");
    res.render("packages_add", {driversDB: driversDB});
})

/**
 * Route to handle the submission of a new package, and redirects to list all packages.
 * @name post/add
 * @function
 * @memberof module:routers/packages
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post("/add", checkAuthentication, async function(req, res) {
    let title = req.body.title;
    let weight = req.body.weight;
    let destination = req.body.destination;
    let description = req.body.description;
    let isAllocated = req.body.isAllocated;
    let driverId = req.body.driverId;

    let aPackage = new Package({title: title, weight: weight, destination: destination, isAllocated: isAllocated, driverId: driverId, description: description});
    await aPackage.save();
    await incrementCRUDCounter("create");

    let allocatedDriver = await Driver.findOne({_id: new ObjectId(aPackage.driverId)});
    allocatedDriver.assignedPackages.push(aPackage._id);
    await allocatedDriver.save();
    await incrementCRUDCounter("update");

    res.redirect("/33251282/Zhi'En/packages");
})

/**
 * Route to display the form for deleting a package by ID.
 * @name get/delete
 * @function
 * @memberof module:routers/packages
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/delete", checkAuthentication, function(req, res) {
    res.render("packages_delete");
})

/**
 * Route to handle the deletion of a package by ID.
 * @name get/delete-req
 * @function
 * @memberof module:routers/packages
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/delete-req", checkAuthentication, async function(req, res) {
    let id = req.query.packageId;

    if (!id) {
        return res.render("invalid_data");
    }

    await Package.findOneAndDelete({id: id});
    await incrementCRUDCounter("delete");
    res.redirect("/33251282/Zhi'En/packages");
})

/**
 * Exports the router for managing packages.
 * @type {Object}
 * @property {Object} packagesRouter - Express router for packages.
 */
module.exports = router;