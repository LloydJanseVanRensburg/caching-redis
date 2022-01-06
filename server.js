require('dotenv').config();

const express = require('express');
const db = require('./models');

const app = express();

app.use('/api/v1/feeds', require('./routes/feedRoutes'));

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
