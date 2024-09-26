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
 * Path module.
 * @const
 */
const path = require("path");

/**
 * EJS module.
 * @const
 */
const ejs = require("ejs");

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
   return ("Connected Successfully");
}

// Establish connection to MongoDB
connectDB(url)
    .then(console.log)
    .catch((err) => console.log(err));

/**
 * Functions for accessing Firestore database.
 * @const
 */
const { db, incrementCRUDCounter, signupUser, getUser } = require("./firestoreHelper");

/**
 * Middleware function for authentication.
 * @const
 */
const { checkAuthentication } = require("./helper");

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
 * Driver Mongoose Schema.
 */
const Driver = require("./models/driver");

/**
 * Package Mongoose Schema
 */
const Package = require("./models/package");

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
 * Middleware to parse application/x-www-form-urlencoded.
 * @name urlencodedMiddleware
 * @function
 * @param {Object} options - Middleware options
 */
app.use(express.urlencoded({ extended: true })); 

/**
 * Middleware to parse JSON data.
 * @name jsonMiddleware
 * @function
 */
app.use(express.json());

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
 * Middleware to serve static CSS files from Bootstrap.
 * @name staticMiddlewareCSS
 * @function
 */
app.use(express.static("node_modules/bootstrap/dist/css")); 

/**
 * Middleware to serve static images.
 * @name staticMiddlewareImages
 * @function
 */
app.use(express.static("assets/images"));

/**
 * Middleware to serve static CSS files.
 * @name staticMiddlewareAssets
 * @function
 */
app.use(express.static("assets"));

app.use(express.static("./dist/33251282-a3/browser"));

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
 * Set the HTML engine to EJS for rendering views.
 * @name engine
 * @function
 * @param {string} ext - The file extension to use
 * @param {function} callback - The render function
 */
app.engine("html", ejs.renderFile); 

/**
 * Set the view engine to HTML (EJS).
 * @name setViewEngine
 * @function
 * @param {string} engine - The view engine to use
 */
app.set("view engine", "html");

/**
 * Starts the Express server on the specified port.
 * @name listen
 * @function
 * @param {number} port - The port number to listen on
 */
app.listen(PORT_NUMBER);

/**
 * Redirects root requests with no pathname to the application home page.
 * @name rootRedirect
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get("/", function(req, res) {
    res.redirect("/33251282/Zhi'En");
})

/**
 * Renders the application home page.
 * @name mainAppPage
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get("/33251282/Zhi'En", async function(req, res) {
    let drivers = await Driver.find({});
    let packages = await Package.find({});
    res.render("index", {drivers: drivers, packages: packages}); 
})

/**
 * Renders the CRUD operation stats page.
 * @name statsPage
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get("/33251282/Zhi'En/stats", checkAuthentication, async function(req, res) {
    const statsDoc = await db.collection('data').doc('stats').get();
    const stats = statsDoc.data();
    res.render("stats", {stats: stats}); 
})

/**
 * Renders the login page.
 * @name loginPage
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get("/33251282/Zhi'En/login", function(req, res) {
    res.render("login"); 
})

/**
 * Handles the login process.
 * @name loginProcess
 * @function
 * @param {string} path - The request path ("/33251282/Zhi'En/login").
 * @param {function} callback - The function to handle the request. Validates user credentials and
 *                              sets session authentication status. Redirects based on the outcome.
 */
app.post("/33251282/Zhi'En/login", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let userFound = await getUser(username, password);

    if (!userFound) {
        res.render("invalid_data");
    } else {
        req.session.isAuthenticated = true;
        res.redirect("/33251282/Zhi'En");
    }
})

/**
 * Renders the signup page.
 * @name signupPage
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get("/33251282/Zhi'En/signup", function(req, res) {
    res.render("signup"); 
})

/**
 * Handles the signup process.
 * @name signupProcess
 * @function
 * @param {string} path - The request path ("/33251282/Zhi'En/signup").
 * @param {function} callback - The function to handle the request. Validates passwords, creates a new user,
 *                              and handles redirection or error rendering based on the outcome.
 */
app.post("/33251282/Zhi'En/signup", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (confirmPassword != password) {
        res.render("invalid_data")
    } else {
        await signupUser(username, password);
        res.redirect("/33251282/Zhi'En/login");
    }
})

/**
 * Handles 404 errors by rendering a 404 Page Not Found page.
 * @name handle404
 * @function
 * @param {function} callback - The function to handle the request
 */
app.use((req, res) => {
    res.render("404");
}) 