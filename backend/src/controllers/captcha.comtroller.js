import createAndSetCaptcha from "../services/captcha.service.js";
export const createCaptcha = async (req, res) => {
  const { id, svg } = await createAndSetCaptcha();
  res.status(201).json({ captchaId: id, captchaSvg: svg });
};
