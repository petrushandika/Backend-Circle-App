module.exports = {
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
        format: "email",
      },
      password: {
        type: "string",
      },
      avatar: {
        type: "file",
      },
    },
    required: ["fullName", "username", "email", "password"],
  },
};
