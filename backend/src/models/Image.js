import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const ImageSchema = new Schema(
  {
    url: String,
    feature: { type: Boolean, default: false },
    article: { type: Mongoose.Types.ObjectId, ref: 'Article' },
    type: { type: String, default: 'image' },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
ImageSchema.pre('save', function (next) {
  next();
});

const ImageModel = Mongoose.model('Image', ImageSchema);

export default ImageModel;
