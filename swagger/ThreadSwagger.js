module.exports = {
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
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
};
