const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('./src/middleware/morgan')
const helmet = require('./src/middleware/helmet')
const cors = require('./src/middleware/cors')
require('dotenv').config()

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan)
app.use(cors)
app.use(helmet)

app.get('/', (req, res) => {
    res.json({ info: 'Recipe API Version 2', author: 'Mahardhika Putra Pratama'})
})

app.listen(port, ()=>{
    console.log(`App running on ${process.env.BASE_URL}`)
})