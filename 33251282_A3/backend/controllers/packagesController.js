/**
 * Package module.
 * @module controllers/packagesController
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

const Package = require("../models/package");
const Driver = require("../models/driver");
const { incrementCRUDCounter } = require("../firestoreHelper");

module.exports = {
    /**
     * Retrieve all packages from the database.
     * The response will include the driver assigned to each package.
     * Increments the "retrieve" CRUD counter.
     *
     * @async
     * @function getAllPackages
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - List of all packages.
     */
    getAllPackages: async function(req, res) {
        try {
            let pkg = await Package.find({}).populate("driverId");
            await incrementCRUDCounter("retrieve");
            res.status(200).json(pkg); 
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }
    },

    /**
     * Add a new package to the database.
     * The request body must include package details such as title, weight, destination, and driver ID.
     * The newly added package will be assigned to a driver.
     * Increments both the "create" and "update" CRUD counters.
     *
     * @async
     * @function addPackage
     * @param {Object} req - The Express request object containing the package details.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - The newly added package's ID and internal ID.
     */
    addPackage: async function(req, res) {
        try {
            let aPackage = req.body; 
            let packageDoc = new Package({
                title: aPackage.package_title, 
                weight: aPackage.package_weight, 
                destination: aPackage.package_destination, 
                description: aPackage.package_description, 
                isAllocated: aPackage.isAllocated, 
                driverId: aPackage.driver_id
            });
            await packageDoc.save();
            await incrementCRUDCounter("create");
    
            let allocatedDriver = await Driver.findOne({_id: aPackage.driver_id});
            allocatedDriver.assignedPackages.push(packageDoc._id);
            await allocatedDriver.save();
            await incrementCRUDCounter("update");
    
            res.status(200).json({
                id: packageDoc._id,
                package_id: packageDoc.id
            });
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }
    },

    /**
     * Remove a package from the database by its ID.
     * Also removes the package from the list of assigned packages of any drivers.
     * Increments the "delete" CRUD counter.
     *
     * @async
     * @function removePackageById
     * @param {Object} req - The Express request object containing the package ID in the URL parameters.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - The result of the deletion or an error message if the package was not found.
     */
    removePackageById: async function(req, res) {
        try {
            let id = req.params.id;
            let thePackage = await Package.findOne({_id: id});
    
            if (!thePackage) {
                res.status(404).json({
                    status: "ID not found"
                });
            } else {
                let drivers = await Driver.find({}).populate("assignedPackages");
                drivers.forEach(async driver => {
                    let index = driver.assignedPackages.indexOf(thePackage._id);
                    if (index > -1) {
                        driver.assignedPackages.splice(index, 1);
                    }
                    await driver.save();
                });
                let result = await Package.deleteOne({_id: id});
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
     * Update a package's destination by its ID.
     * The request body must include the new destination for the package.
     * Increments the "update" CRUD counter.
     *
     * @async
     * @function updatePackageById
     * @param {Object} req - The Express request object containing the package ID and new destination in the body.
     * @param {Object} res - The Express response object.
     * @returns {JSON} - A status message indicating success or failure.
     */
    updatePackageById: async function(req, res) {
        try {
            let packageId = req.body.package_id;
            let packageDestination = req.body.package_destination;
            let thePackage = await Package.findOneAndUpdate({_id: packageId}, {destination: packageDestination});
            if (!thePackage) {
                res.status(404).json({
                    status: "ID not found"
                });
            } else {
                await thePackage.save();
                await incrementCRUDCounter("update");
                res.status(200).json({
                    status: "Package updated successfully"
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "An error occurred"
            });
        }
    }
}