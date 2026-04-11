import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const PeopleSchema = new Schema(
  {
    name: String,
    called_name: String,
    nickname: String,
    birthday: Date,
    nationality: String,
    status: String,
    known_date: Date,
    image: {
      type: Mongoose.Types.ObjectId,
      ref: 'Image',
    },
    social_media: {
      facebook: String,
      instagram: String,
    },
    meeting_place: String,
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
PeopleSchema.pre('save', function (next) {
  next();
});

const PlaceModel = Mongoose.model('People', PeopleSchema);

export default PlaceModel;
