
const purchasesSwagger = {
  paths: {
    "/purchases": {
      post: {
        tags: ["Purchases"],
        summary: "Create a purchase",
        description: "Create a new purchase",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PurchaseCreate" }
            }
          }
        },
        responses: {
          201: {
            description: "Purchase created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Purchase" }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      },
      get: {
        tags: ["Purchases"],
        summary: "Get all purchases",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of purchases",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Purchase" }
                }
              }
            }
          }
        }
      }
    },

    "/purchases/{id}": {
      get: {
        tags: ["Purchases"],
        summary: "Get purchase by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Purchase data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Purchase" } }
            }
          },
          404: { description: "Purchase not found" }
        }
      },
      delete: {
        tags: ["Purchases"],
        summary: "Delete a purchase",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Purchase deleted successfully" },
          404: { description: "Purchase not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Purchase: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          user_id: { type: "integer", example: 10 },
          course_id: { type: "integer", example: 5 },
          total_price: { type: "number", format: "float", example: 49.99 },
          purchase_date: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      PurchaseCreate: {
        type: "object",
        required: ["user_id","course_id","total_price","purchase_date"],
        properties: {
          user_id: { type: "integer", example: 10 },
          course_id: { type: "integer", example: 5 },
          total_price: { type: "number", format: "float", example: 49.99 },
          purchase_date: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      }
    }
  }
};

export default purchasesSwagger;
