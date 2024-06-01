import joi from "joi";

export const LikeSchema = joi.object({
  userId: joi.number().optional(),
  threadId: joi.number().required(),
});
