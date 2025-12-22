
const components = {
    securitySchemes: {
        BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
        }
    },
    schemas: {
        ErrorResponse: {
            type: "object",
            properties: {
                message: {
                    oneOf: [
                        { type: "string" },
                        {
                            type: "array",
                            items: { type: "string" }
                        }
                    ]
                }
            }
        },
        SuccessResponse: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    example: "Operation successful"
                }
            }
        }
    }
};

export default components;
