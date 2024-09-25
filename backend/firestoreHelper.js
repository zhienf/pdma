/**
 * Firebase module.
 * 
 * This module handles the initialization of Firebase and provides functions for interacting with Firestore,
 * including managing CRUD counters and user authentication.
 * 
 * @module firestoreHelper
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

/**
 * Firebase Admin SDK module.
 * @const
 */
const admin = require("firebase-admin");

/**
 * Firebase private key reference.
 * @const
 */
const serviceAccount = require("./service-account.json"); 

/** 
 * Initialise access to Firebase.
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

/**
 * Access to Firestore database.
 * @const
 */
const db = admin.firestore();

initialiseCounters();

/**
 * Initializes counters in Firestore.
 * 
 * Checks if the 'stats' document exists in the 'data' collection. If not, creates it with initial counts set to 0.
 * @async
 * @function
 */
async function initialiseCounters() {
    const statsRef = db.collection('data').doc('stats');
    const doc = await statsRef.get(); // get current stats document
    
    // initialise counters if the document doesn't exist
    if (!doc.exists) {
        await statsRef.set({ create: 0, retrieve: 0, update: 0, delete: 0 });
    }
};

/**
 * Increments the CRUD operation counter in Firestore.
 * 
 * Increments the count of the specified CRUD operation ('create', 'retrieve', 'update', 'delete') in the 'stats' document.
 * 
 * @param {string} operation - The CRUD operation to increment. Must be one of 'create', 'retrieve', 'update', 'delete'.
 * @async
 * @function
 */
async function incrementCRUDCounter(operation) {
    const statsRef = db.collection('data').doc('stats');
    const doc = await statsRef.get(); // get current stats document
    
    // increment the appropriate counter
    const stats = doc.data();
    stats[operation] += 1;
    
    // update the Firestore document with new count
    await statsRef.set(stats);
};

/**
 * Signs up a new user.
 * 
 * Adds a new user to the 'users' collection with the provided username and password.
 * 
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @async
 * @function
 */
async function signupUser(username, password) {
    await db.collection('users')
        .doc() 
        .set({ 'username': username, 'password': password });
}

/**
 * Retrieves a user from Firestore.
 * 
 * Checks if a user with the specified username and password exists in the 'users' collection.
 * 
 * @param {string} username - The username of the user to retrieve.
 * @param {string} password - The password of the user to validate.
 * @returns {Promise<boolean>} - Returns true if a user with the given username and password is found, otherwise false.
 * @async
 * @function
 */
async function getUser(username, password) {
    const userSnapshot = await db.collection('users').where('username', '==', username).get();

    if (userSnapshot.empty) {
        return false; // No such user found
    }

    // Iterate over users
    let userFound = false;
    userSnapshot.forEach(async (doc) => {
        const userData = doc.data();
        
        if (userData.password == password) {
            userFound = true;
        }
    });

    return userFound; 
}

module.exports = {
    db: db,
    incrementCRUDCounter: incrementCRUDCounter,
    signupUser: signupUser,
    getUser: getUser
};