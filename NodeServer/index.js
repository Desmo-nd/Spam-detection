const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');
const port = 3000;

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/api/', authRouter);



app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT || port}!`)
);
