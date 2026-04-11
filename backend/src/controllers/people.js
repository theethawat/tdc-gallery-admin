import _ from 'lodash';
import MainService from '../services/MainService';
import PeopleModel from '../models/People';

const PeopleService = new MainService(PeopleModel, 'article');

export const onReadAll = async (req, res) => {
  try {
    const pipeline = [];

    pipeline.push({ $sort: { date: -1 } });

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
              called_name: {
                $regex: req?.query?.name,
              },
            },
          ],
        },
      });
    }

    // Populating the Images
    pipeline.push({
      $lookup: {
        from: 'images',
        as: 'image',
        localField: 'image',
        foreignField: '_id',
      },
    });

    pipeline.push({
      $set: { image: { $arrayElemAt: ['$image', -1] } },
    });

    const result = await PeopleService.aggregation({
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
    const pipeline = [];

    // Populating the Images
    pipeline.push({
      $lookup: {
        from: 'images',
        as: 'image',
        localField: 'image',
        foreignField: '_id',
      },
    });

    pipeline.push({
      $set: { image: { $arrayElemAt: ['$image', -1] } },
    });

    const result = await PeopleService.getOneAggregation(req.params.id, {
      pipeline,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await PeopleService.createOne(req.body);
    if (!_.isEmpty(req?.body?.image)) {
      const selectedImage = req?.body?.image;
      result.image = selectedImage;
      await result.save();
    }
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await PeopleService.updateOne(req.params.id, req.body);
    if (!_.isEmpty(req?.body?.image)) {
      const selectedImage = req?.body?.image;
      await PeopleModel.findByIdAndUpdate(req.params.id, {
        image: selectedImage,
      });
    }
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await PeopleService.deleteOne(req.params.id);
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
