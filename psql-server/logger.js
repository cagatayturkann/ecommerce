var winston = require('winston');
require('winston-daily-rotate-file');

//defining logging file format
var transport = new winston.transports.DailyRotateFile({
	filename: 'logs/application-%DATE%.log',
	datePattern: 'YYYY-MM-DD-HH',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
});

transport.on('rotate', function (oldFilename, newFilename) {
	// do something fun
});

//defining log format for info/warning/error
var logger = winston.createLogger({
	transports: [
		transport,
		new winston.transports.Console({
			filename: 'logs/infos.log',
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
		}),
		new winston.transports.File({
			filename: 'logs/warnings.log',
			level: 'warn',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
		}),
		new winston.transports.File({
			filename: 'logs/errors.log',
			level: 'error',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
		}),
	],
});

module.exports = logger;
