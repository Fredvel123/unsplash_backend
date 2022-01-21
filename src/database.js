const mongoose = require('mongoose');

const URI = 'mongodb://0.0.0.0:27017/unsplash_db';
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(URI, config)
  .then(db => console.log('the data base is connected'))
  .catch(err => console.log(err))