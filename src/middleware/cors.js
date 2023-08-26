// middleware/cors.js
const Cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const cors = Cors(corsOptions)

module.exports = cors