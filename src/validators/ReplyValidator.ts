import joi from "joi";

export const ReplySchema = joi.object({
  userId: joi.number().optional(),
  threadId: joi.number().required(),
  image: joi.string().optional(),
  content: joi.string().min(1).max(255).required(),
});
