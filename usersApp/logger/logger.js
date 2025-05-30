// Example 1: Simple console Logger

// const winston = require('winston');
// const logger = winston.createLogger(
//   {
//     format: winston.format.json(),
//     transports: [
//       new winston.transports.Console()
//     ]
//   }
// )

// Example 2: Timestamp, label and console Logger

// const  { format, createLogger, transports } = require('winston')
// const { combine, timestamp, label, printf } = format
// const CATEGORY = "Products app logs"

// const customFormat = printf(({message, label, timestamp})=>{
//   return `${timestamp} [${label}: ${message}]`
// })

// const logger = createLogger({
//   // level: warn,
//   format: combine(
//     label({label: CATEGORY}),
//     timestamp(),
//     customFormat
//   ),
//   transports: [new transports.Console()]
// })

// Example 3: 
require('winston-daily-rotate-file');
require('winston-mongodb')
const  { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "Products app logs";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "7d",
  level: "error"
});

const logger = createLogger({
  format: combine(
    label({label: "MY LABEL FOR PRODUCTS APP"}),
    timestamp({format:"DD-MM-YYYY HH:mm:sss"}),
    format.json()
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    fileRotateTransport,
    new transports.File(
      {
        filename: "logs/example.log"
      }
    ),
    new transports.File(
      {
        level: "info",
        filename: 'logs/info.log'
      }
    ),
    new transports.File(
      {
        level: "warn",
        filename: 'logs/warn.log'
      }
    ),
    new transports.File(
      {
        level: "error",
        filename: 'logs/error.log'
      }
    ),
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URI,
      collection: 'server-logs',
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
})

module.exports = logger;