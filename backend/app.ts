require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT: string | number = process.env.PORT || 3030;

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app
  .listen(PORT)
  .on('error', (error: Error) =>
    console.log(`Ошибка сервера: ${error.message}`),
  )
  .on('listening', () => console.log(`Сервер слушает порт ${PORT}`));
