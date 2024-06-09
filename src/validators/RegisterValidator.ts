import joi from "joi";

export const RegisterSchema = joi.object({
  username: joi.string().min(1).max(255).required(),
  fullName: joi.string().min(1).max(255).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  avatar: joi.string().optional(),
  bio: joi.string().optional(),
});
