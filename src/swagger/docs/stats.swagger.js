
const statsSwagger = {
  paths: {
    "/stats": {
      get: {
        tags: ["Stats"],
        summary: "Get sales stats for the last 30 days",
        description: "Returns total sales and purchases in the last 30 days. Admin or Super Admin only.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Sales stats retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    totalSales: { type: "number", format: "float", example: 12345.67 },
                    totalPurchases: { type: "integer", example: 50 },
                    startDate: { type: "string", format: "date", example: "2025-12-01" },
                    endDate: { type: "string", format: "date", example: "2025-12-23" }
                  }
                }
              }
            }
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden: Admin or Super Admin only" }
        }
      }
    }
  },
  components: {
    schemas: {}
  }
};

export default statsSwagger;
