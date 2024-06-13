module.exports = {
  FindUserDTO: {
    type: "object",
    properties: {
      fullName: {
        type: "string",
      },
      username: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
      avatar: {
        type: "string",
        format: "binary",
      },
      bio: {
        type: "string",
      },
      createdAt: {
        type: "string",
        format: "date",
      },
      updatedAt: {
        type: "string",
        format: "date",
      },
      followers: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            fullName: {
              type: "string",
            },
            username: {
              type: "string",
            },
            avatar: {
              type: "string",
              format: "binary",
            },
            followAt: {
              type: "string",
              format: "date",
            },
          },
        },
      },
      following: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            fullName: {
              type: "string",
            },
            username: {
              type: "string",
            },
            avatar: {
              type: "string",
              format: "binary",
            },
            followAt: {
              type: "string",
              format: "date",
            },
          },
        },
      },
    },
  },
  CreateUserDTO: {
    type: "object",
    properties: {
      fullName: {
        type: "string",
      },
      username: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
      avatar: {
        type: "file",
      },
      bio: {
        type: "string",
      },
    },
  },
  UpdateUserDTO: {
    type: "object",
    properties: {
      fullName: {
        type: "string",
      },
      username: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
      avatar: {
        type: "string",
        format: "binary",
      },
      bio: {
        type: "string",
      },
    },
  },
  DeleteUserDTO: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
    },
    required: ["id"],
  },
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
};
