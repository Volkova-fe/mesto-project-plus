require('dotenv').config()
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import errorHandler from './middleware/ErrorHandlingMiddleware';
import userController from './controllers/userController';
import authMiddleware from './middleware/authMiddleware';

const PORT = process.env.PORT || 5003

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', userController.login);
app.post('/signup', userController.createUser);
app.use(authMiddleware);

app.use('/', router);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);

    app.listen(PORT,
      () => console.log(`Server start ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}

start()