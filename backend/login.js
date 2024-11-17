const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

// Usuarios simulados
const users = [
  { username: 'admin', password: '1234' },
  { username: 'user', password: 'password' },
];

// Endpoint para autenticación
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login exitoso', user: { username: user.username } });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
