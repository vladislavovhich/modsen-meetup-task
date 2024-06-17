const generateSwagger = require("swagger-autogen")();
    
const swaggerDocument = {
    info: {
        title: 'Meetup API',
        version: '1.0.0',
        description: 'Meetup API Information',
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
}

const swaggerFile= "./docs/swagger.json";
const apiRouteFile= ["./app.js"]

generateSwagger(swaggerFile, apiRouteFile, swaggerDocument);