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
    high_privacy: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const DiaryArticleSchema = new Schema(
  {
    ...ArticleSchema.obj,
    withs: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'People',
      },
    ],
    gallery: {
      type: Mongoose.Types.ObjectId,
      ref: 'GalleryArticle',
    },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
ArticleSchema.pre('save', function (next) {
  next();
});

export const GalleryArticle = Mongoose.model('GalleryArticle', ArticleSchema);
export const DiaryArticle = Mongoose.model('DiaryArticle', DiaryArticleSchema);
