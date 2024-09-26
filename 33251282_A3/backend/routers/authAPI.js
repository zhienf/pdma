/**
 * @module routers/authAPI
 * @description This module handles the routing for managing user authentication (login/signup). 
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Express module.
 * @const
 */
const express = require("express");

/**
 * Firestore helper functions for user authentication.
 * @const
 */
const { getUser, signupUser } = require("../firestoreHelper");

/**
 * Express Router to define routes for user authentication (login and signup).
 * @const
 */
const router = express.Router();

/**
 * POST login endpoint.
 * 
 * This route handles user login by checking the provided username and password 
 * against stored users in Firestore. If the credentials are valid, the session 
 * is updated to reflect the authenticated state.
 * 
 * @name POST /login
 * @function
 * @param {string} req.body.username - The username provided by the user.
 * @param {string} req.body.password - The password provided by the user.
 * @returns {Object} JSON response with the login status.
 */
router.post("/login", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let userFound = await getUser(username, password);

    if (!userFound) {
        res.status(400).json({
            status: 'Invalid username or password'
        });
    } else {
        req.session.isAuthenticated = true;
        res.status(200).json({
            status: 'Login successfully'
        });
    }
});

/**
 * POST signup endpoint.
 * 
 * This route handles user signup by checking that the provided passwords match 
 * and then adding the new user to Firestore. A JSON response is returned to 
 * indicate success or failure.
 * 
 * @name POST /signup
 * @function
 * @param {string} req.body.username - The username to be registered.
 * @param {string} req.body.password - The password for the new account.
 * @param {string} req.body.confirmPassword - The confirmation password.
 * @returns {Object} JSON response with the signup status.
 */
router.post("/signup", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (confirmPassword != password) {
        res.status(400).json({
            status: 'Passwords do not match'
        });
    } else {
        await signupUser(username, password);
        res.status(200).json({
            status: 'Signup successfully'
        });
    }
});

module.exports = router;