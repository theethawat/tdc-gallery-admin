import Mongoose from 'mongoose';
import _ from 'lodash';
import MainService from '../services/MainService';
import ArticleModel from '../models/Article';
import ImageModel from '../models/Image';

const ArticleService = new MainService(ArticleModel, 'article');

export const onReadAll = async (req, res) => {
  try {
    const pipeline = [];

    if (req?.query?.name) {
      pipeline.push({
        $match: {
          name: {
            $regex: req?.query?.name,
          },
        },
      });
    }

    if (req?.query?.category) {
      pipeline.push({
        $match: {
          category: {
            $regex: Mongoose.Types.ObjectId(req?.query?.category),
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: 'categories',
        as: 'category',
        localField: 'category',
        foreignField: '_id',
      },
    });

    pipeline.push({
      $unwind: {
        path: '$category',
      },
    });

    const result = await ArticleService.aggregation({
      page: req?.query?.page,
      size: req?.query?.size,
      pipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const result = await ArticleService.getOne(req.params.id, 'category');
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await ArticleService.createOne(req.body);
    if (!_.isEmpty(req?.body?.images)) {
      for await (const image of req?.body?.images || []) {
        const imageId = image?._id;
        await ImageModel.findByIdAndUpdate(imageId, {
          $set: {
            article: result?._id,
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
    await ArticleService.updateOne(req.params.id, req.body);
    if (!_.isEmpty(req?.body?.images)) {
      for await (const image of req?.body?.images || []) {
        const imageId = image?._id;
        await ImageModel.findByIdAndUpdate(imageId, {
          $set: {
            article: req?.params?.id,
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
    await ArticleService.deleteOne(req.params.id);
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
