import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import itemsRouter from './routers/items-router';
import categoriesRouter from './routers/categories-router';
import authRouther from './routers/auth-router';
import config from './config';

const server = express();

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client / build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build / index.html'));
  });
}

const port = process.env.PORT || 5000;

// Middlewares
server.use(cors()); // Leidžiame bendrauti su visais.
server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/items', itemsRouter);
server.use('/api/categories', categoriesRouter);
server.use('/api/auth', authRouther);

mongoose.connect(
  config.db.connectionUrl,
  {
    retryWrites: true,
    w: 'majority',
  },
  (error) => {
    if (error) {
      console.log(`Nepavyko Prisijungti:\n${error.message}`);
      return;
    }
    console.log('Successfully connected to MongoDB');
    server.listen(1338, () => console.log('Appliaction server is running on: http://localhost:1338'));
  },
);
