const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const doc = {
  info: {
    title: "Circle App API Docs",
    description: "Welcome to my API Docs",
  },
  servers: [
    {
      url: "https://backend-circle-app-production.up.railway.app",
    },
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    "@schemas": {
      RegisterDTO: {
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
          },
          password: {
            type: "string",
          },
        },
        required: ["fullName", "email", "password"],
      },
      LoginDTO: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["email", "password"],
      },
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
        required: ["fullName", "username", "email", "password"],
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

      FindThreadDTO: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "file",
          },
          totalLikes: {
            type: "number",
          },
          totalReplies: {
            type: "number",
          },
          userId: {
            type: "integer",
          },
          createdAt: {
            type: "string",
            format: "date",
          },
          updatedAt: {
            type: "string",
            format: "date",
          },
          user: {
            type: "object",
            properties: {
              fullName: {
                type: "string",
              },
              username: {
                type: "string",
              },
              avatar: {
                type: "string",
              },
            },
          },
        },
      },
      CreateThreadDTO: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "file",
          },
        },
        required: ["content"],
      },
      UpdateThreadDTO: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "file",
          },
        },
        required: ["content"],
      },
      DeleteThreadDTO: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
        },
        required: ["id"],
      },
    },
    LikeDTO: {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
        threadId: {
          type: "integer",
        },
      },
      required: ["userId", "threadId"],
    },
    ReplyDTO: {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
        threadId: {
          type: "integer",
        },
        avatar: {
          type: "string",
          format: "binary",
        },
        image: {
          type: "file",
        },
        content: {
          type: "string",
        },
      },
      required: ["userId", "threadId", "content"],
    },
    FollowDTO: {
      type: "object",
      properties: {
        followersId: {
          type: "integer",
        },
        followingId: {
          type: "integer",
        },
      },
      required: ["followersId", "followingId"],
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["../src/server.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
