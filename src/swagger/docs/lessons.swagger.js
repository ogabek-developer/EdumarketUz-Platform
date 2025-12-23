
const lessonsSwagger = {
  paths: {
    "/lessons": {
      post: {
        tags: ["Lessons"],
        summary: "Create a lesson",
        description: "Create a new lesson with video upload",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["course_id", "title", "video"],
                properties: {
                  course_id: { type: "integer", example: 1 },
                  title: { type: "string", example: "Introduction to JS" },
                  video: { type: "string", format: "binary" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Lesson created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Lesson" }
              }
            }
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      },
      get: {
        tags: ["Lessons"],
        summary: "Get all lessons",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of lessons",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lesson" }
                }
              }
            }
          }
        }
      }
    },

    "/lessons/{id}": {
      get: {
        tags: ["Lessons"],
        summary: "Get lesson by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lesson data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Lesson" } }
            }
          },
          404: { description: "Lesson not found" }
        }
      },
      put: {
        tags: ["Lessons"],
        summary: "Update lesson",
        description: "Update lesson info and optionally video",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  course_id: { type: "integer", example: 1 },
                  title: { type: "string", example: "Advanced JS" },
                  video: { type: "string", format: "binary" },
                  duration: { type: "string", example: "12:30" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Lesson updated successfully",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Lesson" } }
            }
          },
          403: { description: "Forbidden" },
          404: { description: "Lesson not found" }
        }
      },
      delete: {
        tags: ["Lessons"],
        summary: "Delete lesson",
        description: "Delete a lesson (admin/instructor/superadmin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Lesson deleted successfully" },
          403: { description: "Forbidden" },
          404: { description: "Lesson not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Lesson: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          course_id: { type: "integer", example: 1 },
          title: { type: "string", example: "Introduction to JS" },
          video_url: { type: "string", example: "https://cdn.example.com/video.mp4" },
          video_id: { type: "string", example: "abc123" },
          duration: { type: "string", example: "12:30" },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      }
    }
  }
};

export default lessonsSwagger;
