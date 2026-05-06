import Mongoose from 'mongoose';
import _ from 'lodash';
import MainService from '../services/MainService';
import GiftModel from '../models/Gift';
import ImageModel from '../models/Image';
import { IMAGE_TYPE } from '../configs/constants';

const GiftService = new MainService(GiftModel, 'gift');

export const createPipeline = (query) => {
  const pipeline = [];
  const lookupPipeline = [];

  if (req?.query?.name) {
    pipeline.push({
      $match: {
        $or: [
          {
            name: {
              $regex: req?.query?.name,
            },
          },
          {
            occasion: {
              $regex: req?.query?.name,
            },
          },
        ],
      },
    });
  }

  if (req?.query?.date) {
    const date = new Date(req?.query?.date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    pipeline.push({
      $match: {
        date: {
          $gte: date,
          $lt: nextDate,
        },
      },
    });
  }

  if (req?.query?.receivers) {
    pipeline.push({
      $match: {
        $expr: {
          $in: [Mongoose.Types.ObjectId(req?.query?.people), '$receivers'],
        },
      },
    });
  }

  if (req?.query?.giver) {
    pipeline.push({
      $match: {
        giver: Mongoose.Types.ObjectId(req?.query?.giver),
      },
    });
  }

  if (req?.query?.mode) {
    pipeline.push({
      $match: {
        mode: req?.query?.mode,
      },
    });
  }

  pipeline.push({ $sort: { date: -1 } });

  // Populating the Images
  lookupPipeline.push({
    $lookup: {
      from: 'images',
      as: 'image',
      localField: '_id',
      foreignField: 'gift',
    },
  });

  lookupPipeline.push({
    $lookup: {
      from: 'people',
      as: 'receivers',
      localField: 'receivers',
      foreignField: '_id',
    },
  });

  lookupPipeline.push({
    $lookup: {
      from: 'people',
      as: 'giver',
      localField: 'giver',
      foreignField: '_id',
    },
  });

  return { pipeline, lookupPipeline };
};

export const onReadAll = async (req, res) => {
  try {
    const { pipeline, lookupPipeline } = createPipeline(req?.query);
    const result = await GiftService.aggregation({
      page: req?.query?.page,
      size: req?.query?.size,
      pipeline,
      lookupPipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const { pipeline, lookupPipeline } = createPipeline(req?.query);
    const allPipeline = [...pipeline, ...lookupPipeline];
    const result = await GiftService.getOneAggregation(req.params.id, {
      pipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await GiftService.createOne(req.body);
    if (!_.isEmpty(req?.body?.images)) {
      for await (const image of req?.body?.images || []) {
        const imageId = image?._id;
        await ImageModel.findByIdAndUpdate(imageId, {
          $set: {
            gift: result?._id,
            type: IMAGE_TYPE.GIFT.type_code,
          },
        });
      }
    }
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await GiftService.updateOne(req.params.id, req.body);
    if (!_.isEmpty(req?.body?.images)) {
      for await (const image of req?.body?.images || []) {
        const imageId = image?._id;
        await ImageModel.findByIdAndUpdate(imageId, {
          $set: {
            gift: req?.params?.id,
            type: IMAGE_TYPE.GIFT.type_code,
          },
        });
      }
    }
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await GiftService.deleteOne(req.params.id);
    res.status(204).send({ message: 'Delete Success' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export default {
  onReadAll,
  onReadOne,
  onCreateOne,
  onEditOne,
  onDeleteOne,
};
