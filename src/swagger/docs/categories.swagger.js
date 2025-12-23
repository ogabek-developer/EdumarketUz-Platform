
const categoriesSwagger = {
  paths: {
    "/categories/create": {
      post: {
        tags: ["Categories"],
        summary: "Create category",
        description: "Create a new category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryCreate" }
            }
          }
        },
        responses: {
          201: {
            description: "Category created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" }
              }
            }
          },
          400: { description: "Validation error" }
        }
      }
    },

    "/categories/get/all": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          200: {
            description: "Categories list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" }
                }
              }
            }
          }
        }
      }
    },

    "/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Get category by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "Category data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" }
              }
            }
          },
          404: { description: "Category not found" }
        }
      },
      put: {
        tags: ["Categories"],
        summary: "Update category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryUpdate" }
            }
          }
        },
        responses: {
          200: {
            description: "Category updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" }
              }
            }
          },
          404: { description: "Category not found" }
        }
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Category deleted successfully" },
          404: { description: "Category not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Category: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Mathematics" },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      CategoryCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Mathematics" }
        }
      },

      CategoryUpdate: {
        type: "object",
        properties: {
          name: { type: "string", example: "Physics" }
        }
      }
    }
  }
};

export default categoriesSwagger;
