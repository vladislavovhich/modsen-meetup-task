
const generateSwagger = require("swagger-autogen")();
require('dotenv').config()
   
const swaggerDocument = {
    info: {
        title: 'Meetup API',
        version: '1.0.0',
        description: 'Meetup API Information',
    },
    host: `${process.env.HOST}:${process.env.NODE_LOCAL_PORT}`,
    basePath: "/",
    schemes: ["https", "http"],
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
        CreateMeetup: {
            name: "Meetup 1",
            place: "Some place",
            time: "2024-12-12T09:00:00.000Z",
            description: "text",
            tags: ['React', 'backend'],
        },
        UpdateMeetup: {
            name: "Meetup 1",
            place: "Some place",
            time: "2024-12-12T09:00:00.000Z",
            description: "text",
            tags: ['React', 'backend'],
        },
        CreateTag: {
            name: "tag 1"
        },
        UpdateTag: {
            name: "tag 1"
        },
        LoginUser: {
            email: "example@gmail.com",
            password: "password"
        },
        RegisterUser: {
            email: "example@gmail.com",
            password: "password",
            roleId: 1
        }
    }
}

const swaggerFile= "../docs/swagger.json";
const apiRouteFile= ["../../app.ts"]

generateSwagger(swaggerFile, apiRouteFile, swaggerDocument);