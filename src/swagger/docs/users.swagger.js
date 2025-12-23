const usersSwagger = {
  paths: {
    "/users/get/all": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of all users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" }
                }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      }
    },

    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "User data", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "User not found" }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user by ID (super admin only)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "User deleted successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "User not found" }
        }
      },
      put: {
        tags: ["Users"],
        summary: "Update user role (admin or super admin only)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserRoleUpdate" }
            }
          }
        },
        responses: {
          200: { description: "User role updated successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "User not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          first_name: { type: "string", example: "Ogabek" },
          last_name: { type: "string", example: "Norqulov" },
          email: { type: "string", example: "ogabekdev2008@gmail.com" },
          phone_number: { type: "string", example: "+998901234567" },
          role: { type: "string", enum: ["student","instructor","admin"], example: "student" },
          avatar: { type: "string", example: "https://cdn.example.com/avatar.png" },
          photo_id: { type: "string", example: "photo_123" },
          otp: { type: "integer", example: 123456 },
          otp_time: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          is_verified: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      UserRoleUpdate: {
        type: "object",
        required: ["role"],
        properties: {
          role: { type: "string", enum: ["student","instructor","admin"], example: "admin" }
        }
      }
    }
  }
};

export default usersSwagger;
