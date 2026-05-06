import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const CrushSchema = new Schema(
  {
    name: String,
    with: { type: Mongoose.Types.ObjectId, ref: 'People' },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String },
    worstStatus: { type: String },
    bestStatus: { type: String },
    currentStatus: { type: String },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
CrushSchema.pre('save', function (next) {
  next();
});

const Crush = Mongoose.model('Crush', CrushSchema);
export default Crush;
