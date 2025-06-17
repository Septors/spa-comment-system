export const handleErrorMidlleware = (err, req, res, next) => {
  const message = err.message || "Server error";
  const type = err.typeError || 500;

  console.error(`Error type: ${type},error message:${message}`);

  res.status(type).json({ error: message });
};
