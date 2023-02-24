const validateEmail = (req, res) => {
  const { email } = req.body;
  const pattern = /(.+)@(.+){2,}\.(.+){2,}/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!pattern.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatePassword = (req, res) => {
  const { password } = req.body;

  const MIN_LENGTH = 6;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < MIN_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const validateLogin = (req, res, next) =>
  validateEmail(req, res) || validatePassword(req, res) || next();

module.exports = validateLogin;
