const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const config = require('./config');
const logger = require('./utils/logger');
const e = require('express');

// Connect to the database
(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

// Prepare and run the server
const app = express();

app.use((req, res, next) => {
  req.on('error', (err) => {
    logger.error(err);
  });
  res.on('close', () => {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress;
    const logMessage = `${ip} "${req.method} ${req.url}" ${res.statusCode} ${req.headers['user-agent']}`;
    if (/2\d{2}/.test(res.statusCode)) {
      logger.info(logMessage);
    }
    else {
      logger.error(logMessage);
    }
  });
  next();
});

app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errors());

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  if (!err.status) {
    logger.error(err);
    res.status(500);
    return res.send({ message: 'Произошла неизвестная ошибка. Мы работаем над этим.' });
  }
  res.status(err.status);
  return res.send({ message: err.message });
});

app.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
  console.log(`Express server has been started at http://${config.SERVER_HOST}:${config.SERVER_PORT}`);
});
