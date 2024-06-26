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

# Step 4: Model/Schema
## users.js: 
Idea is to not repeat code. We can reuse this model for every comment.
```javascript
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *       example:
 *         id: 787
 *         name: Hector
 *         email: example@swagger.com
 */
```

Good example from documentation: https://swagger.io/docs/specification/components/

# Step 5: Comments

## GET
```javascript
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
```
show docs page then show how you need to add a tag so is not under default.

```javascript
//This is under the s
 /**
  * @openapi
  * tags:
  *   name: Users
  *   description: The users managing API
  */
```

Update GET comment to include tag

```javascript
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
```


## GET/id
Here parameters are introduced
```javascript
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
```

## POST
NOTE: Here we did not use a ref for the schema. Only the response is using the model we created before.
```javascript
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *             example:
 *               name: NottaRef
 *               email: not.doe@example.com
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, name and email are required
 */
```

## PUT
NOTE: Now we include requestBody.
```javascript
/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Updates a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *             example:
 *               name: nottaRefAgain
 *               email: not2.doe@example.com
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user with the given ID was not found
 */
```
It would probably be better to make a schema for requestbody.

## DELETE
```javascript
/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user with the given ID was not found
 */
```
