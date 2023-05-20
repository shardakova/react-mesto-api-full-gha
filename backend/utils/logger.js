const path = require('path');
const { createLogger, format, transports } = require('winston');

function logger() {
  const logsPath = './logs/';

  const winston = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.json(),
    ),
    transports: [
      new transports.File({
        filename: path.join(logsPath, 'error.log'),
        level: 'error',
      }),
      new transports.File({
        filename: path.join(logsPath, 'requests.log'),
        level: 'info',
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        filename: path.join(logsPath, 'exceptions.log'),
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
      handleExceptions: true,
    }));
  }

  return winston;
}

module.exports = logger();
