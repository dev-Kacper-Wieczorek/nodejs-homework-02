const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const contactsRouter = require('./routes/api/contacts');

const app = express();

// 1️⃣ Połączenie z MongoDB
const DB_HOST = 'mongodb+srv://admin:Kacper2024@contactscluster.ur1ad.mongodb.net/?retryWrites=true&w=majority&appName=ContactsCluster';


mongoose.connect(DB_HOST)
  .then(() => {
    console.log('✅ Database connection successful');

    // 2️⃣ Uruchomienie serwera po połączeniu z MongoDB
    app.listen(3000, () => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  })
  .catch(error => {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  });

// 3️⃣ Middleware
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// 4️⃣ Routes
app.use('/api/contacts', contactsRouter);

// 5️⃣ Obsługa błędów
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
