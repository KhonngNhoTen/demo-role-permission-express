module.exports = async (data, req, res, next) => {
  if (data instanceof Error) {
    const status = parseInt(data.status) || 500;
    data.success = false;
    console.log(data);
    res.status(status).json(data);
  } else {
    const status = data.httpCode || 200;
    res.status(status).json({ ...data, success: true });
  }
};
