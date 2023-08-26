const morgan = require('morgan');
// const logFormat = ':method :url :status :response-time ms - :res[content-length]';
const logger = morgan('combined');

module.exports = logger;