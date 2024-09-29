/**
 * Driver module.
 * @module controllers/driversController
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

const Driver = require("../models/driver");
const Package = require("../models/package");
const { incrementCRUDCounter } = require("../firestoreHelper");
const { ObjectId } = require('mongodb');

module.exports = {
    /**
     * Retrieve all drivers from the database.
     * The response will include the assigned packages for each driver.
     * Increments the "retrieve" CRUD counter.
     *
     * @async
     * @function getAllDrivers
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - List of all drivers.
     */
    getAllDrivers: async function(req, res) {
        try {
            let driver = await Driver.find({}).populate("assignedPackages");
            await incrementCRUDCounter("retrieve");
            res.status(200).json(driver);
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }
    },

    /**
     * Add a new driver to the database.
     * The request body must include driver details such as name, department, license, and status (active/inactive).
     * Increments the "create" CRUD counter.
     *
     * @async
     * @function addDriver
     * @param {Object} req - The Express request object containing the driver details.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - The newly added driver's ID and internal ID.
     */
    addDriver: async function(req, res) {
        try {
            let aDriver = req.body;
            let driverDoc = new Driver({name: aDriver.driver_name, department: aDriver.driver_department, licence: aDriver.driver_licence, isActive: aDriver.driver_isActive});
            await driverDoc.save();
            await incrementCRUDCounter("create");
            res.status(200).json({
                id: driverDoc._id,
                driver_id: driverDoc.id
            });
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }
    },

    /**
     * Remove a driver from the database by their ID.
     * Also deletes all packages assigned to the driver.
     * Increments the "delete" CRUD counter.
     *
     * @async
     * @function removeDriverById
     * @param {Object} req - The Express request object containing the driver ID in query parameters.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - The result of the deletion or an error message if the driver was not found.
     */
    removeDriverById: async function(req, res) {
        try {
            let id = req.query.id;
            let theDriver = await Driver.findOne({_id: id});
            if (!theDriver) {
                res.status(404).json({
                    status: "ID not found"
                });
            } else {
                let assignedPackages = theDriver.assignedPackages;
                assignedPackages.forEach(async pkg => {
                    await Package.findOneAndDelete({_id: pkg._id});
                });
                let result = await Driver.deleteOne({_id: id});
                await incrementCRUDCounter("delete");
                res.status(200).json(result);
            }     
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }   
    },

    /**
     * Update a driver's details by their ID.
     * The request body must include the driver's new license and department.
     * Increments the "update" CRUD counter.
     *
     * @async
     * @function updateDriverById
     * @param {Object} req - The Express request object containing the driver ID, license, and department in the body.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - A status message indicating success or failure.
     */
    updateDriverById: async function(req, res) {
        try {
            let driverId = req.body.id;
            let driverLicence = req.body.driver_licence;
            let driverDepartment = req.body.driver_department;
            let theDriver = await Driver.findOneAndUpdate({_id: driverId}, {licence: driverLicence, department: driverDepartment});
            if (!theDriver) {
                res.status(404).json({
                    status: "ID not found"
                });
            } else {
                await theDriver.save();
                await incrementCRUDCounter("update");
                res.status(200).json({
                    status: "Driver updated successfully"
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }
    }
}