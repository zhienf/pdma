/**
 * Helper module.
 * 
 * This module handles helper function such as checking authentication of user.
 * @module helper
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */
module.exports = {
    /**
     * Middleware to check if a user is authenticated.
     * 
     * This middleware checks if the user is logged in by verifying the `isAuthenticated` property 
     * on the session object. If authenticated, it proceeds to the next route handler. 
     * Otherwise, it redirects the user to the login page.
     * 
     * @name checkAuthentication
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    checkAuthentication: function checkAuthentication(req, res, next) {
        if (req.session.isAuthenticated) {
            return next(); // User is logged in, proceed to next route handler
        } else {
            return res.redirect("/33251282/Zhi'En/login"); // User is not authenticated, redirect to login page
        }
    },

    /**
     * Middleware to check if a user is authenticated for API routes.
     * 
     * This middleware checks if the user is logged in by verifying the `isAuthenticated` property 
     * on the session object. If authenticated, it proceeds to the next route handler. 
     * Otherwise, it responds with a 400 status code and an error message indicating the need to log in.
     * 
     * @name checkAuthenticationAPI
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    checkAuthenticationAPI: function checkAuthenticationAPI(req, res, next) {
        if (req.session.isAuthenticated) {
            return next(); // User is logged in, proceed to next route handler
        } else {
            return res.status(400).json({
                status: 'Please login to continue'
            }); // User is not authenticated
        }
    }
}