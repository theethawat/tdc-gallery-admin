import Mongoose from 'mongoose';
import { RATE_LEVEL } from '../configs/constants';

const { Schema } = Mongoose;

const MomentSchema = new Schema(
  {
    name: String,
    date: { type: Date },
    withs: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'People',
      },
    ],
    dairyArticle: {
      type: Mongoose.Types.ObjectId,
      ref: 'DiaryArticle',
    },
    rate: { type: String, default: RATE_LEVEL.LEVEL_1.type_code },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
MomentSchema.pre('save', function (next) {
  next();
});

export const SpecialMoment = Mongoose.model('SpecialMoment', MomentSchema);
export const Lesson = Mongoose.model('Lesson', MomentSchema);
