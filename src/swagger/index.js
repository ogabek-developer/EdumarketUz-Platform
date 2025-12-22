
import swaggerJsdoc from "swagger-jsdoc";
import components from "./components.js";
import tags from "./tags.js";

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Education Platform API",
            version: "1.0.0",
            description: "Backend API documentation"
        },
        servers: [
            {
                url: "http://127.0.0.1:4000/api",
                description: "Local development server"
            }
        ],
        tags,
        components
    },
    apis: []
});

export default swaggerSpec;
