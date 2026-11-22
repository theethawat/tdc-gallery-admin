import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const PlaceSchema = new Schema(
  {
    translation: {
      th: {
        name: String,
      },
      en: {
        name: String,
      },
    },
    // @deprecated, use translation instead
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
