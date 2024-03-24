import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const PlaceSchema = new Schema(
  {
    name: String,
    type_code: { type: String, index: true },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
PlaceSchema.pre('save', function (next) {
  next();
});

const PlaceModel = Mongoose.model('Place', PlaceSchema);

export default PlaceModel;
