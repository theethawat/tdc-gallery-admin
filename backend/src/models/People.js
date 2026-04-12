import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const PeopleSchema = new Schema(
  {
    name: String,
    calledName: String,
    nickname: String,
    birthday: Date,
    nationality: String,
    status: { type: String, default: 'colleague' },
    knownDate: Date,
    image: {
      type: Mongoose.Types.ObjectId,
      ref: 'Image',
    },
    socialMedia: {
      facebook: String,
      instagram: String,
    },
    meetingPlace: String,
    note: String,
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
