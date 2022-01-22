const app = require('./app');
const PORT = app.get('port') 
const HOST = ' https://imagesfredvel.herokuapp.com/'

// data base mongodb config
require('./database');

app.listen(PORT, () => {
  console.log(`the server is connected on port ${HOST}`);
})