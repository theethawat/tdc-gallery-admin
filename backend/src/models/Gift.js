import Mongoose from 'mongoose';
import { GIFT_MODE } from '../configs/constants';

const { Schema } = Mongoose;

const GiftSchema = new Schema(
  {
    name: String,
    date: { type: Date },
    mode: { type: String, default: GIFT_MODE.GIVER.type_code },
    giver: {
      type: Mongoose.Types.ObjectId,
      ref: 'People',
    },
    receivers: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'People',
      },
    ],
    occasion: String,
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
GiftSchema.pre('save', function (next) {
  next();
});

const Gift = Mongoose.model('Gift', GiftSchema);
export default Gift;
