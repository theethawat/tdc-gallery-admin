import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const ProductSchema = new Schema(
  {
    name: String,
    type_code: String,
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
ProductSchema.pre('save', function (next) {
  next();
});

const ProductModel = Mongoose.model('Product', ProductSchema);

export default ProductModel;
