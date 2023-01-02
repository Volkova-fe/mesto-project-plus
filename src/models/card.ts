import { model, Schema, Types } from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: [Types.ObjectId];
  createdAt: Date;
}

const CardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 2 && v.length < 30
      },
      message: 'Текст должен быть не короче 2 симв. и не длиннее 30',
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/
      },
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [Types.ObjectId],
    default:[],
    required: true
  },
  createdAt: {
    type: Date,
		default: Date.now
  }
});
export default model<ICard>('card', CardSchema);