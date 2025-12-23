
const adminsSwagger = {
  paths: {
    "/admins": {
      post: {
        tags: ["Admins"],
        summary: "Create admin",
        description: "Create new admin (only super admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminCreate"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Admin created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Admin"
                }
              }
            }
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      },
      get: {
        tags: ["Admins"],
        summary: "Get all admins",
        description: "Get admins list (admin or super admin)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Admins list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Admin"
                  }
                }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      }
    },

    "/admins/{id}": {
      get: {
        tags: ["Admins"],
        summary: "Get admin by ID",
        security: [{ bearerAuth: [] }],
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
            description: "Admin data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Admin"
                }
              }
            }
          },
          404: { description: "Admin not found" }
        }
      },
      put: {
        tags: ["Admins"],
        summary: "Update admin",
        description: "Update admin (only super admin)",
        security: [{ bearerAuth: [] }],
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
              schema: {
                $ref: "#/components/schemas/AdminUpdate"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Admin updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Admin"
                }
              }
            }
          },
          403: { description: "Forbidden" }
        }
      },
      delete: {
        tags: ["Admins"],
        summary: "Delete admin",
        description: "Delete admin (only super admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Admin deleted" },
          403: { description: "Forbidden" }
        }
      }
    }
  },

  components: {
    schemas: {
      Admin: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          user_id: {
            type: "integer",
            example: 15
          },
          is_super: {
            type: "boolean",
            example: false
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-01-01T12:00:00.000Z"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-01-01T12:00:00.000Z"
          }
        }
      },

      AdminCreate: {
        type: "object",
        required: ["user_id"],
        properties: {
          user_id: {
            type: "integer",
            description: "Existing user ID",
            example: 15
          },
          is_super: {
            type: "boolean",
            description: "Super admin flag",
            example: false
          }
        }
      },

      AdminUpdate: {
        type: "object",
        properties: {
          is_super: {
            type: "boolean",
            example: true
          }
        }
      }
    }
  }
};

export default adminsSwagger;
