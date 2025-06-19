import Joi from "joi";

export const commentSchema = Joi.object({
  userName: Joi.string().required().message({
    "string.userName": "Неккоректне ім'я користувача",
    "any.required": "ім'я є обовязковим",
  }),
  email: Joi.string().email().required().message({
    "string.email": "Пошта має недопустимі символи",
    "any.required": "Пошта є обовязковим полем",
  }),
  homePage: Joi.string().optional().message({
    "string.homePage": "Некоректне посилання",
  }),
  parentId: Joi.number().optional(),
  text: Joi.string().max(300).required().message({
    "string.text": "Неккоректний текст",
    "max.text": "Превищено макисмально допустимий вміст коменттарю",
    "any.required": "Текст в комментарі є обовязковим",
  }),
});
