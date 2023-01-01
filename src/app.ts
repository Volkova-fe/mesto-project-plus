import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5003

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

const start = async () => {
  try {
      app.listen(PORT, () => console.log(`Server start ${PORT}`))
  } catch (e) {
      console.log(e)
  }


}

start()