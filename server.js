const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar o Firebase
const firebaseConfig = {
  apiKey: "process.env.AIzaSyCVPdDwvn2GnugJw2Fm3k_idn4mXQlsn1Y",
  authDomain: "financial-n.firebaseapp.com",
  projectId: "financial-n",
  storageBucket: "financial-n.appspot.com",
  messagingSenderId: "869482768612",
  appId: "1:869482768612:web:b1e9101a527b4fe5f664f1"
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota para manipular o payload e salvar no Firebase
app.post('/proxy', async (req, res) => {
  const payload = req.body;
  await db.collection('transactions').add({
    payload,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  res.json({ success: true });
});

// Ouvir na porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
