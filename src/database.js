const mongoose = require('mongoose');

const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWD}@cluster0.iyu84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(URI, config)
  .then(db => console.log('the data base is connected'))
  .catch(err => console.log(err))