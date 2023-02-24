const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const VALID_LENGTH = 16;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== VALID_LENGTH || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = validateToken;
