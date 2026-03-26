function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Cet email est déjà utilisé",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Erreur serveur",
  });
}

module.exports = errorHandler;