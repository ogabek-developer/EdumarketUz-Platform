
const paymentsSwagger = {
  paths: {
    "/payments": {
      post: {
        tags: ["Payments"],
        summary: "Create a payment",
        description: "Create a new payment",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PaymentCreate" }
            }
          }
        },
        responses: {
          201: {
            description: "Payment created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Payment" }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      },
      get: {
        tags: ["Payments"],
        summary: "Get all payments",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of payments",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Payment" }
                }
              }
            }
          }
        }
      }
    },

    "/payments/{id}": {
      get: {
        tags: ["Payments"],
        summary: "Get payment by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Payment data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Payment" } }
            }
          },
          404: { description: "Payment not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Payment: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          purchase_id: { type: "integer", example: 101 },
          user_id: { type: "integer", example: 10 },
          amount: { type: "number", format: "float", example: 49.99 },
          status: { type: "string", enum: ["pending","paid","canceled"], example: "paid" },
          transaction_id: { type: "string", example: "txn_abc123" },
          paid_at: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      PaymentCreate: {
        type: "object",
        required: ["purchase_id","user_id","amount","transaction_id"],
        properties: {
          purchase_id: { type: "integer", example: 101 },
          user_id: { type: "integer", example: 10 },
          amount: { type: "number", format: "float", example: 49.99 },
          status: { type: "string", enum: ["pending","paid","canceled"], example: "pending" },
          transaction_id: { type: "string", example: "txn_abc123" },
          paid_at: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      }
    }
  }
};

export default paymentsSwagger;
