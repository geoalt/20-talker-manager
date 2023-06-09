const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', routes.talker);
app.use('/login', routes.login);

app.listen(PORT, () => {
  console.log('Online');
});
