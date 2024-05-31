import joi from "joi";

export const LoginSchema = joi.object({
  username: joi.string().min(1).max(255).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const RegisterSchema = joi.object({
  fullName: joi.string().min(1).max(255).required(),
  username: joi.string().min(1).max(255).required(),
  email: joi.string().email().required(),
});
