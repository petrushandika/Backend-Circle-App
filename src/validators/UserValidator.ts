import joi from "joi";

export const UserSchema = joi.object({
  fullName: joi.string().optional(),
  username: joi.string().optional(),
  email: joi.string().email(),
  password: joi.string(),
  avatar: joi.string().optional(),
  bio: joi.string().optional(),
});
