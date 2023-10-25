const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar o Firebase
const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API_KEY",
  authDomain: "financial-n.firebaseapp.com",
  projectId: "financial-n",
  storageBucket: "financial-n.appspot.com",
  messagingSenderId: "869482768612",
  appId: "1:869482768612:web:b1e9101a527b4fe5f664f1"
};

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "financial-n",
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-amojr%40financial-n.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  })
});

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
