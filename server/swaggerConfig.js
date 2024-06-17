import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Necroland API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API',
        },
        servers: [
            {
                url: 'http://localhost:3000' || 'https://necroland-api.onrender.com/api',
            },
        ],
    },
    apis: ['./swaggerDocs.js'], // Path to the file where the Swagger annotations are located
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };