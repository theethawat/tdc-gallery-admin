import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const CategorySchema = new Schema(
  {
    name: String,
    place: { type: Mongoose.Types.ObjectId, ref: 'Place' },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
CategorySchema.pre('save', function (next) {
  next();
});

const CategoryModel = Mongoose.model('Category', CategorySchema);

export default CategoryModel;
