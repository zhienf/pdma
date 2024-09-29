/**
 * @file This file sets up an Express server for the application, including routes for managing drivers and packages.
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Express module.
 * @const
 */
const express = require("express");

/**
 * Mongoose module.
 * @const
 */
const mongoose = require("mongoose");

/**
 * Express session middleware.
 * @const
 */
const session = require('express-session');

/**
 * Mongoose database URL. 
 */
// const url = "mongodb://10.192.0.3:27017/pdma"; // private IP address of VM hosting MongoDB
const url = "mongodb://127.0.0.1:27017/pdma";

/**
 * Configure Mongoose.
 * @param {string} url 
 * @returns {string}
 */
async function connectDB(url) {
   await mongoose.connect(url);
   return ("Connected to Mongoose successfully.");
}

// Establish connection to MongoDB
connectDB(url)
    .then(console.log)
    .catch((err) => console.log(err));

/**
 * Functions for accessing Firestore database.
 * @const
 */
const { db } = require("./firestoreHelper");

/**
 * Middleware function for authentication.
 * @const
 */
const { checkAuthenticationAPI } = require("./helper");

/**
 * The Express router instance for managing driver-related RESTful API endpoints.
 * @type {Router}
 */
const driversAPIRouter = require("./routers/driversAPI");

/**
 * The Express router instance for managing package-related RESTful API endpoints.
 * @type {Router}
 */
const packagesAPIRouter = require("./routers/packagesAPI");

/**
 * The Express router instance for managing user authentication RESTful API endpoints.
 * @type {Router}
 */
const authAPIRouter = require("./routers/authAPI");

/**
 * Port number to listen on.
 * @const
 */
const PORT_NUMBER = 8080;

/**
 * Application instance.
 * @const
 */
const app = express();

/**
 * Starts the Express server on the specified port.
 * @name listen
 * @function
 * @param {number} port - The port number to listen on
 */
app.listen(PORT_NUMBER);

/**
 * Middleware to parse JSON data.
 * @name jsonMiddleware
 * @function
 */
app.use(express.json());

app.use(express.static('./dist/33251282-a3/browser'));

/**
 * Middleware to manage user session.
 * @name sessionMiddleware
 * @function
 */
app.use(session({
    secret: 'fit2095-a2', // secret key for session encryption
    resave: false,           // session not saved if unmodified
    saveUninitialized: false // session not created until something is stored
  }));

/**
 * Renders the CRUD operation stats page.
 * @name statsPage
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get("/33251282/Zhi'En/api/v1/stats", checkAuthenticationAPI, async function(req, res) {
    const statsDoc = await db.collection('data').doc('stats').get();
    res.status(200).json(statsDoc.data());
});

/**
 * Routes for managing drivers API endpoints.
 * @name driversAPIRouter
 * @function
 */
app.use("/33251282/Zhi'En/api/v1/drivers", driversAPIRouter);

/**
 * Routes for managing packages API endpoints.
 * @name packagesAPIRouter
 * @function
 */
app.use("/33251282/Zhi'En/api/v1/packages", packagesAPIRouter);

/**
 * Routes for managing authentication API endpoints.
 * @name driversAPIRouter
 * @function
 */
app.use("/33251282/Zhi'En/api/v1", authAPIRouter);

/**
 * Handles 404 errors by rendering a 404 Page Not Found page.
 * @name handle404
 * @function
 * @param {function} callback - The function to handle the request
 */
app.use((req, res) => {
    res.status(404);
}); 