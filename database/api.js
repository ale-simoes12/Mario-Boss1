const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionTimeoutMillis: 5000,
  max: 20
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/dados', async (req, res) => {
  try {
    const dados = await db.any('SELECT * FROM jogador');
    res.json(dados);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});


app.post('/dados', async (req, res) => {
  const { nome, vidas, tempo } = req.body;

  try {
    await db.none(
      'INSERT INTO jogador (nome, vidas, tempo) VALUES ($1, $2, $3)',
      [nome, vidas, tempo]
    );
    res.status(201).json({ mensagem: 'Dados inseridos com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    res.status(500).json({ error: 'Erro ao inserir dados' });
  }
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
