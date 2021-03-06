const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
// config variables enviroment

// middlewares
app.use(express.json());
app.use(cors());

// settings
app.set('port', process.env.PORT || 8000);



// routers API
app.use('/api/users', require('./routers/users.routers')); // users routers
app.use('/api/images', require('./routers/images.routers')); // images routers

app.get('/', (req, res) => {
 res.json({
   status: 200,
   message: 'the server is online'
 })
})

module.exports = app; 