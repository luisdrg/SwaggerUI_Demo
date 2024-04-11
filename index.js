const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require ("swagger-jsdoc");

//  Outlines the API's information, detailing its features and where to locate it.
const options = {
	definition: {
		// Specifies the OpenAPI specification version being used.
		openapi: "3.0.0", 
		info: {
			// The title of the API.
			title: "Library API", 
			// The version of the API.
			version: "1.0.0", 
			// A short description of the API.
			description: "A simple Express Library API",
		},
		// The servers array lists all the servers where the API can be accessed.
		servers: [
			{
				// The URL of the server where the API is hosted.
				url: "http://localhost:3000",
			},
		],
	},
	// The paths to the files containing the API endpoints.
	apis: ["./routes/*.js"], 
};

// returns the specs needed to setup the UI
const specs = swaggerJsDoc(options);
const app = express();
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

const PORT = 3000;
const usersRouter = require('./routes/users');

// middleware to parse incoming JSON requests into JavaScript objects. (available in the req.body property)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome! Demo server is running');
});

// Use the users router for all requests to /users
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});