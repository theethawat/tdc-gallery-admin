import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const ArticleSchema = new Schema(
  {
    name: String,
    categories: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'Category',
      },
    ],
    date: { type: Date },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
ArticleSchema.pre('save', function (next) {
  next();
});

const ArticleModel = Mongoose.model('Article', ArticleSchema);

export default ArticleModel;
