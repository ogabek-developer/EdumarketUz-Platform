
const instructorsSwagger = {
  paths: {
    "/instructors": {
      post: {
        tags: ["Instructors"],
        summary: "Create instructor",
        description: "Create a new instructor (admin only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InstructorCreate" }
            }
          }
        },
        responses: {
          201: {
            description: "Instructor created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Instructor" }
              }
            }
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      },
      get: {
        tags: ["Instructors"],
        summary: "Get all instructors",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Instructors list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Instructor" }
                }
              }
            }
          }
        }
      }
    },

    "/instructors/{id}": {
      get: {
        tags: ["Instructors"],
        summary: "Get instructor by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Instructor data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Instructor" } }
            }
          },
          404: { description: "Instructor not found" }
        }
      },
      put: {
        tags: ["Instructors"],
        summary: "Update instructor",
        description: "Update an instructor (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InstructorUpdate" }
            }
          }
        },
        responses: {
          200: {
            description: "Instructor updated",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Instructor" } }
            }
          },
          403: { description: "Forbidden" },
          404: { description: "Instructor not found" }
        }
      },
      delete: {
        tags: ["Instructors"],
        summary: "Delete instructor",
        description: "Delete an instructor (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Instructor deleted successfully" },
          403: { description: "Forbidden" },
          404: { description: "Instructor not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Instructor: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          user_id: { type: "integer", example: 10 },
          bio: { type: "string", example: "Expert in web development" },
          skills: { type: "string", example: "JavaScript, Node.js, React" },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      InstructorCreate: {
        type: "object",
        required: ["user_id","bio","skills"],
        properties: {
          user_id: { type: "integer", example: 10 },
          bio: { type: "string", example: "Expert in web development" },
          skills: { type: "string", example: "JavaScript, Node.js, React" }
        }
      },

      InstructorUpdate: {
        type: "object",
        properties: {
          bio: { type: "string", example: "Senior web developer" },
          skills: { type: "string", example: "JavaScript, Node.js, React, TypeScript" }
        }
      }
    }
  }
};

export default instructorsSwagger;
