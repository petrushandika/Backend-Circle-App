module.exports = {
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
};
