const express = require('express');
const cors = require('cors');
const users = require('./users');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login Existoso' });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
