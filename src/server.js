require('dotenv').config();
const app = require('./app.js');
const { db } = require('./database/config.js');
const initModel = require('./models/init.model.js');

db.authenticate()
  .then(() => console.log('Database connected 👍'))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log('Database synchronized 😎'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🤩`);
});
