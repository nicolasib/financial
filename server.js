import express from 'express'
import cors from 'cors'
import {firebase} from './firebase'

const app = express();
const db = firebase.firestore();
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
  try {
    const payload = req.body;
    const docRef = db.collection('transactions').doc(); // Cria um novo documento

    await docRef.set({
      payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp() // timestamp do servidor
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Erro ao salvar no Firestore:', error);
    res.status(500).json({ error: 'Algo deu errado' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
