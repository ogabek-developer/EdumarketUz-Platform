
const coursesSwagger = {
  paths: {
    "/courses": {
      post: {
        tags: ["Courses"],
        summary: "Create a course",
        description: "Create a new course (admin or instructor only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CourseCreate" }
            }
          }
        },
        responses: {
          201: {
            description: "Course created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" }
              }
            }
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      },
      get: {
        tags: ["Courses"],
        summary: "Get all courses",
        description: "Retrieve all courses",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Courses list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Course" }
                }
              }
            }
          }
        }
      }
    },

    "/courses/{id}": {
      get: {
        tags: ["Courses"],
        summary: "Get course by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Course data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Course" } }
            }
          },
          404: { description: "Course not found" }
        }
      },
      put: {
        tags: ["Courses"],
        summary: "Update course",
        description: "Update a course (admin or instructor only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/CourseUpdate" } }
          }
        },
        responses: {
          200: {
            description: "Course updated successfully",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Course" } }
            }
          },
          403: { description: "Forbidden" },
          404: { description: "Course not found" }
        }
      },
      delete: {
        tags: ["Courses"],
        summary: "Delete course",
        description: "Delete a course (admin/instructor/superadmin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Course deleted successfully" },
          403: { description: "Forbidden" },
          404: { description: "Course not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Course: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          instructor_id: { type: "integer", example: 5 },
          category_id: { type: "integer", example: 3 },
          name: { type: "string", example: "JavaScript for Beginners" },
          description: { type: "string", example: "Learn JS from scratch" },
          price: { type: "number", format: "float", example: 49.99 },
          level: { type: "string", enum: ["beginner","intermediate","advanced"], example: "beginner" },
          is_free: { type: "boolean", example: false },
          lesson_count: { type: "integer", example: 12 },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      CourseCreate: {
        type: "object",
        required: ["instructor_id","category_id","name","description","price","is_free","lesson_count"],
        properties: {
          instructor_id: { type: "integer", example: 5 },
          category_id: { type: "integer", example: 3 },
          name: { type: "string", example: "JavaScript for Beginners" },
          description: { type: "string", example: "Learn JS from scratch" },
          price: { type: "number", format: "float", example: 49.99 },
          level: { type: "string", enum: ["beginner","intermediate","advanced"], example: "beginner" },
          is_free: { type: "boolean", example: false },
          lesson_count: { type: "integer", example: 12 }
        }
      },

      CourseUpdate: {
        type: "object",
        properties: {
          instructor_id: { type: "integer", example: 5 },
          category_id: { type: "integer", example: 3 },
          name: { type: "string", example: "JavaScript Advanced" },
          description: { type: "string", example: "Advanced JS course" },
          price: { type: "number", format: "float", example: 99.99 },
          level: { type: "string", enum: ["beginner","intermediate","advanced"], example: "advanced" },
          is_free: { type: "boolean", example: false },
          lesson_count: { type: "integer", example: 20 }
        }
      }
    }
  }
};

export default coursesSwagger;
