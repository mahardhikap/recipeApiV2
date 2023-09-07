const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('./src/middleware/morgan')
const helmet = require('./src/middleware/helmet')
const cors = require('./src/middleware/cors')
require('dotenv').config()
const user = require('./src/router/userRouter')
const category = require('./src/router/categoryRouter')
const menu = require('./src/router/menuRouter')
const like = require('./src/router/likeRouter')

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

app.use(user)
app.use(category)
app.use(menu)
app.use(like)

app.listen(port, ()=>{
    console.log(`App running on ${process.env.BASE_URL}`)
})