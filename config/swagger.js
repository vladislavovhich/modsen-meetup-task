const generateSwagger = require("swagger-autogen")();
    
const swaggerDocument = {
    info: {
        title: 'Meetup API',
        version: '1.0.0',
        description: 'Meetup API Information',
    },
    host: process.env.DB_HOST,
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "Auth",
            description: "Endpoint"
        },
        {
            name: "Meetup",
            description: "Endpoint"
        },
        {
            name: "Tag",
            description: "Endpoint"
        },
    ],
    definitions: {
        Tag: {
            id: 1,
            name: "React.js",
            user: {
                id: 1,
                email: "example@email.com",
                password: "password_example",
                role: {
                    id: 1,
                    name: "student"
                }
            }
        },
        Meetup: {
            id: 1,
            name: "Meetup",
            description: "JS Backend",
            place: "Vitebsk",
            time: "2024-04-22T21:00:00.000Z",
            tags: [
                {
                    id: 1,
                    name: "React.js",
                    user: {
                        id: 1,
                        email: "example@email.com",
                        password: "password_example",
                        role: {
                            id: 1,
                            name: "student"
                        }
                    }
                },
            ]
        },
        User: {
            id: 1,
            email: "example@email.com",
            password: "password_example",
            role: {
                id: 1,
                name: "student"
            }
        },
        Role: {
            id: 1,
            name: "student"
        }
    }
}

const swaggerFile= "./docs/swagger.json";
const apiRouteFile= ["./app.js"]

generateSwagger(swaggerFile, apiRouteFile, swaggerDocument);