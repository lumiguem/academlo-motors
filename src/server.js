const app = require('./app.js');
const { db } = require('./database/config.js');

db.authenticate()
  .then(() => console.log('Database connected 👍'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('Database synchronized 😎'))
  .catch((err) => console.log(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🤩`);
});
