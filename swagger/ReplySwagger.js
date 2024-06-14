module.exports = {
  ReplyDTO: {
    type: "object",
    properties: {
      userId: {
        type: "integer",
      },
      threadId: {
        type: "integer",
      },
      image: {
        type: "file",
      },
      content: {
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
