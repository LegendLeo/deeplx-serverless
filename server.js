const express = require('express');
const bodyParser = require('body-parser');
const apiHandler = require('./api/translate')

const app = express();
const PORT = 9000;

app.use(bodyParser.json());

app.post('/translate', apiHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
