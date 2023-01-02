import mongoose from "mongoose";

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'User name required'],
    validate: {
      validator: (v: string) => {
        return v.length > 2 && v.length < 30
      },
      message: 'Текст должен быть не короче 2 симв. и не длиннее 30',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 2 && v.length < 200
      },
      message: 'Текст должен быть не короче 2 симв. и не длиннее 200',
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/
      },
      message: 'Некорректная ссылка',
    },
  },
});
export default mongoose.model<IUser>('User', UserSchema);