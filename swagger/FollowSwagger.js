module.exports = {
  FollowDTO: {
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
    },
    required: ["userId", "threadId", "content"],
  },
};
