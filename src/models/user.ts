import { model, Schema } from 'mongoose';
import { regExp } from '../constants/index';
import validator from 'validator';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v: string) => v.length > 2 && v.length < 30,
      message: 'Текст должен быть не короче 2 симв. и не длиннее 30',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    validate: {
      validator: (v: string) => v.length > 2 && v.length < 200,
      message: 'Текст должен быть не короче 2 симв. и не длиннее 200',
    },
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => regExp.test(v),
      message: 'Некорректная ссылка',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User email equired'],
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'User password required'],
  },
});
export default model<IUser>('User', UserSchema);
