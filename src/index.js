const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`https://runkit.com/e app listening at http://localhost:${port}`);
});