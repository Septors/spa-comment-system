import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().message({
    "string.email": "Некоректна пошта",
    "any.required": "Пошта обовьязкова",
  }),
  password: Joi.string()
    .min(6)
    .max(64)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=]+$"))
    .required()
    .message({
      "string.min": "Пароль дуже короткий",
      "string.max": "Пароль дуже довгий",
      "string.pattern.base": "Пароль має недопустимі символи",
      "any.required": "Пароль обовязковий",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().message({
    "any.required": "Паролі не співпадають",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().message({
    "string.email": "Некоректна пошта",
    "any.required": "Пошта обовьязкова",
  }),
  password: Joi.string()
    .min(6)
    .max(64)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=]+$"))
    .required()
    .message({
      "string.min": "Пароль дуже короткий",
      "string.max": "Пароль дуже довгий",
      "string.pattern.base": "Пароль має недопустимі символи",
      "any.required": "Пароль обовязковий",
    }),
});
