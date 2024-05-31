import joi from "joi";

export const ThreadSchema = joi.object({
  image: joi.string().optional(),
  content: joi.string().min(1).max(255).required(),
  totalReplies: joi.number().optional(),
  userId: joi.number().required(),
});
