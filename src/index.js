const app = require('./app');
const PORT = app.get('port') 

// data base mongodb config
require('./database');

app.listen(PORT, () => {
  console.log(`the server is connected on port http://localhost:${PORT}`);
})