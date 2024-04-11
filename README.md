# Step 1: importing swagger UI & swagger-JSDoc
## VScode Terminal
```bash
npm install swagger-jsdoc swagger-ui-express
```

## index.js
```javascript
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require ("swagger-jsdoc");

```


# Step 2: Define Swagger options
## index.js: 
NOTE: options should be defined BEFORE initializing the Express application with const app = express().
```javascript
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


```

Now we pass the options object to 'swaggerJsDoc' to locate and parse comments.
```javascript
// returns the specs needed to setup the UI
const specs = swaggerJsDoc(options);

```

# Step 3: Integrate Swagger with Express
## index.js: 
```javascript
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)