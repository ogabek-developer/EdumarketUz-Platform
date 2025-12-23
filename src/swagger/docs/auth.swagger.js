
const authSwagger = {
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterUser" }
            }
          }
        },
        responses: {
          201: {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User successfully registered" },
                    status: { type: "integer", example: 201 }
                  }
                }
              }
            }
          },
          400: { description: "User already exists / Validation error" }
        }
      }
    },

    "/auth/verify/otp": {
      post: {
        tags: ["Auth"],
        summary: "Verify user OTP",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VerifyOTP" }
            }
          }
        },
        responses: {
          200: {
            description: "OTP verified successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "OTP successfully verified" },
                    status: { type: "integer", example: 200 }
                  }
                }
              }
            }
          },
          400: { description: "Invalid OTP / OTP expired" },
          404: { description: "User not found" }
        }
      }
    },

    "/auth/resend/otp": {
      post: {
        tags: ["Auth"],
        summary: "Resend OTP",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResendOTP" }
            }
          }
        },
        responses: {
          200: {
            description: "OTP resent successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "OTP resent" },
                    status: { type: "integer", example: 200 }
                  }
                }
              }
            }
          },
          404: { description: "User not found" }
        }
      }
    },

    "/auth/forgot/password": {
      post: {
        tags: ["Auth"],
        summary: "Send OTP for password reset",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForgotPassword" }
            }
          }
        },
        responses: {
          200: {
            description: "OTP sent for password reset",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "OTP sent for password reset" },
                    status: { type: "integer", example: 200 }
                  }
                }
              }
            }
          },
          404: { description: "User not found" }
        }
      }
    },

    "/auth/change/password": {
      post: {
        tags: ["Auth"],
        summary: "Change user password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChangePassword" }
            }
          }
        },
        responses: {
          200: {
            description: "Password changed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Password changed" },
                    status: { type: "integer", example: 200 }
                  }
                }
              }
            }
          },
          404: { description: "User not found" }
        }
      }
    },

    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginUser" }
            }
          }
        },
        responses: {
          201: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Login successful" },
                    accessToken: { type: "string", example: "jwt.access.token" },
                    role: { type: "string", example: "student" },
                    status: { type: "integer", example: 201 }
                  }
                }
              }
            }
          },
          401: { description: "Invalid credentials" },
          403: { description: "Account not verified" }
        }
      }
    },

    "/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refresh access token",
        responses: {
          200: {
            description: "Access token refreshed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Access token refreshed" },
                    accessToken: { type: "string", example: "new.jwt.token" },
                    status: { type: "integer", example: 200 }
                  }
                }
              }
            }
          },
          401: { description: "Refresh token missing or invalid" },
          404: { description: "User not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      RegisterUser: {
        type: "object",
        required: ["email", "password", "full_name"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          password: { type: "string", example: "password123" },
          full_name: { type: "string", example: "John Doe" }
        }
      },

      VerifyOTP: {
        type: "object",
        required: ["email", "otp"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          otp: { type: "string", example: "123456" }
        }
      },

      ResendOTP: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" }
        }
      },

      ForgotPassword: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" }
        }
      },

      ChangePassword: {
        type: "object",
        required: ["email", "new_password"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          new_password: { type: "string", example: "newPassword123" }
        }
      },

      LoginUser: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          password: { type: "string", example: "password123" }
        }
      }
    }
  }
};

export default authSwagger;
