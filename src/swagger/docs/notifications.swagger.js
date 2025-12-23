
const notificationsSwagger = {
  paths: {
    "/notifications": {
      post: {
        tags: ["Notifications"],
        summary: "Create a notification",
        description: "Create a new notification (admin only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NotificationCreate" }
            }
          }
        },
        responses: {
          201: {
            description: "Notification created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Notification" }
              }
            }
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      },
      get: {
        tags: ["Notifications"],
        summary: "Get all notifications",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of notifications",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Notification" }
                }
              }
            }
          }
        }
      }
    },

    "/notifications/{id}": {
      get: {
        tags: ["Notifications"],
        summary: "Get notification by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Notification data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Notification" } }
            }
          },
          404: { description: "Notification not found" }
        }
      },
      delete: {
        tags: ["Notifications"],
        summary: "Delete notification",
        description: "Delete a notification (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Notification deleted successfully" },
          403: { description: "Forbidden" },
          404: { description: "Notification not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Notification: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          sender_type: { type: "string", enum: ["admin","instructor"], example: "admin" },
          sender_id: { type: "integer", example: 10 },
          receiver_type: { type: "string", enum: ["admin","instructor","student"], example: "student" },
          type: { type: "string", enum: ["order","payment","course","system","admin"], example: "course" },
          title: { type: "string", example: "New course available" },
          message: { type: "string", example: "A new course on JavaScript is now available." },
          createdAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-01-01T12:00:00.000Z" }
        }
      },

      NotificationCreate: {
        type: "object",
        required: ["sender_type","sender_id","receiver_type","type","title","message"],
        properties: {
          sender_type: { type: "string", enum: ["admin","instructor"], example: "admin" },
          sender_id: { type: "integer", example: 10 },
          receiver_type: { type: "string", enum: ["admin","instructor","student"], example: "student" },
          type: { type: "string", enum: ["order","payment","course","system","admin"], example: "course" },
          title: { type: "string", example: "New course available" },
          message: { type: "string", example: "A new course on JavaScript is now available." }
        }
      }
    }
  }
};

export default notificationsSwagger;
