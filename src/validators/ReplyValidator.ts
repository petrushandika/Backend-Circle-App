import joi from "joi";

export const ReplySchema = joi.object({
  userId: joi.number().optional(),
  threadId: joi.number().required(),
  avatar: joi.string().optional(),
  fullName: joi.string().optional(),
  username: joi.string().optional(),
  image: joi.string().optional(),
  content: joi.string().min(1).max(255).required(),
});
