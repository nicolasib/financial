import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express();

// Permitir CORS para todas as origens
app.use(cors());

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

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
