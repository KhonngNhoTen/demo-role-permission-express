module.exports = async (data, req, res, next) => {
  if (data instanceof Error) {
    const status = data.httpCode || 500;
    data.success = false;
    res.status(status).json(data);
  } else {
    const status = data.httpCode || 200;
    res.status(status).json({ ...data, success: true });
  }
};
