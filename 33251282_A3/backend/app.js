/**
 * @file This file sets up an Express server for the application, including routes for managing drivers and packages.
 * 
 * @author Zhi'En Foo <zfoo0004@student.monash.edu>
 */

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const socketio = require('socket.io');
const http = require('http');
const fs = require("fs");
const path = require("path");
const session = require('express-session');

// Import routers for drivers and packages
const driversAPIRouter = require("./routers/driversAPI");
const packagesAPIRouter = require("./routers/packagesAPI");

// Functions for accessing Firestore database
const { db, signupUser, getUser } = require("./firestoreHelper");

// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech"); 
const textToSpeechClient = new textToSpeech.TextToSpeechClient(); // Creates a client

const translation = require('@google-cloud/translate');
const translationClient = new translation.v2.Translate(); // Creates a client

const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_api_key = "AIzaSyB6vnwdCVCLGV6bog8fOKLxHiwQbUBGh1Y";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
});

// Create an Express app
const app = express(); // create express app
const server = http.createServer(app); // create http server

// Create a new socket.io instance attached to the server
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['*'],
    }
});

io.on('connection', (socket) => {
    console.log(`Client with ID ${socket.id} connected.`);

    socket.on("getTranslation", (data) => {
        console.log(data);
        translationClient.translate(data.originalText, data.targetLanguage, (err, translation) => {
            if (err) {
                console.error("ERROR:", err);
                return;
            }
            console.log(translation);
            data.translatedText = translation;
            socket.emit("receiveTranslation", data);
        });
    });

    socket.on("getSpeech", async (data) => {
        console.log(data);
        const request = {
            input: { text: data },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const fileName = `${data}.mp3`;
        const filePath = path.resolve(__dirname, '../dist/33251282-a3/browser/speech', fileName);

        // create folder for the file
        if (!fs.existsSync(path.resolve(__dirname, '../dist/33251282-a3/browser/speech'))) { 
            fs.mkdirSync(path.resolve(__dirname, '../dist/33251282-a3/browser/speech'));
        }

        // Performs the Text-to-Speech request
        textToSpeechClient.synthesizeSpeech(request, (err, response) => {
            if (err) {
            console.error("ERROR:", err);
            return;
            }
        
            // Write the binary audio content to a file
            fs.writeFile(filePath, response.audioContent, "binary", err => {
            if (err) {
                console.error("ERROR:", err);
                return;
            }
            console.log("Audio content written to file: ", filePath);
            socket.emit("receiveSpeech", fileName);
            });
        });
    });

    socket.on("getDistance", async (data) => {
        console.log(data);
        const result = await geminiModel.generateContent(`Calculate the distance between Melbourne and ${data} in kilometers.`);
        const responseText = result.response.candidates[0].content.parts[0].text;
        console.log(responseText);
        socket.emit("receiveDistance", responseText);
    });
});

// Configure Mongoose
const url = "mongodb://10.192.0.3:27017/pdma"; // private IP address of VM hosting MongoDB
// const url = "mongodb://127.0.0.1:27017/pdma";

async function connectDB(url) {
   await mongoose.connect(url);
   return ("Connected to Mongoose successfully.");
}

// Establish connection to MongoDB
connectDB(url)
    .then(console.log)
    .catch((err) => console.log(err));

// Start the server
const PORT_NUMBER = 8080;
server.listen(PORT_NUMBER);

const API_URL = "/33251282/Zhi'En/api/v1";

app.use(express.json()); // parse JSON data
app.use(express.static('./dist/33251282-a3/browser')); // serve static files
app.use(session({
    secret: 'fit2095-a3', // secret key for session encryption
    resave: false,           // session not saved if unmodified
    saveUninitialized: false // session not created until something is stored
}));

/**
 * Routes for managing drivers API endpoints.
 * @name driversAPIRouter
 * @function
 */
app.use(API_URL + "/drivers", driversAPIRouter);

/**
 * Routes for managing packages API endpoints.
 * @name packagesAPIRouter
 * @function
 */
app.use(API_URL + "/packages", packagesAPIRouter);

/**
 * Renders the CRUD operation stats page.
 * @name statsPage
 * @function
 * @param {string} path - The request path
 * @param {function} callback - The function to handle the request
 */
app.get(API_URL + "/stats", async function(req, res) {
    try {
        const statsDoc = await db.collection('data').doc('stats').get();
        res.status(200).json(statsDoc.data());
    } catch {
        res.status(500).json({
            status: "An error occurred"
        });
    }
});

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
app.post(API_URL + "/login", async function(req, res) {
    try {
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
    } catch {
        res.status(500).json({
            status: "An error occurred"
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
app.post(API_URL + "/signup", async function(req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        let userFound = await getUser(username, password);

        if (userFound) {
            res.status(400).json({
                status: 'User already exists'
            });
        } else if (confirmPassword != password) {
            res.status(400).json({
                status: 'Passwords do not match'
            });
        } else {
            await signupUser(username, password);
            res.status(200).json({
                status: 'Signup successfully'
            });
        }
    } catch {
        res.status(500).json({
            status: "An error occurred"
        });
    }
});

app.get(API_URL + '/auth-check', (req, res) => {
    if (req.session.isAuthenticated) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(200).json({ authenticated: false });
    }
});