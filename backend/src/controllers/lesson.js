import Mongoose from 'mongoose';
import _ from 'lodash';
import MainService from '../services/MainService';
import { Lesson } from '../models/Moment';
import ImageModel from '../models/Image';
import { IMAGE_TYPE } from '../configs/constants';

const LessonService = new MainService(Lesson, 'lesson');

export const createPipeline = (query) => {
  const pipeline = [];
  const lookupPipeline = [];

  if (query?.name) {
    pipeline.push({
      $match: {
        $or: [
          {
            name: {
              $regex: query?.name,
            },
          },
          {
            occasion: {
              $regex: query?.name,
            },
          },
        ],
      },
    });
  }

  if (query?.date) {
    const date = new Date(query?.date);
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

  pipeline.push({ $sort: { date: -1 } });

  lookupPipeline.push({
    $lookup: {
      from: 'people',
      as: 'withs',
      localField: 'withs',
      foreignField: '_id',
    },
  });

  return { pipeline, lookupPipeline };
};

export const onReadAll = async (req, res) => {
  try {
    const { pipeline, lookupPipeline } = createPipeline(req?.query);
    const result = await LessonService.aggregation({
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
    const result = await LessonService.getOneAggregation(req.params.id, {
      pipeline: allPipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await LessonService.createOne(req.body);
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
    await LessonService.updateOne(req.params.id, req.body);
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
    await LessonService.deleteOne(req.params.id);
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
