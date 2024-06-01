import joi from "joi";

export const UserSchema = joi.object({
  fullName: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  avatar: joi.string().optional(),
  bio: joi.string().optional(),
});
