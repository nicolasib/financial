import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Permitir CORS para todas as origens
app.use(cors(corsOptions));

// Middleware para analisar o corpo JSON das requisições
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/16864345/38rmo67/';

  try {
    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Erro ao enviar para o Zapier:', error);
    res.status(500).json({ error: 'Algo deu errado' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
