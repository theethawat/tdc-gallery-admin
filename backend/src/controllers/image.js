import Mongoose from 'mongoose';
import MainService from '../services/MainService';
import ImageModel from '../models/Image';

const ImageService = new MainService(ImageModel, 'image');

export const onReadAll = async (req, res) => {
  try {
    let query = {};

    if (req?.query?.article) {
      query = {
        $or: [
          {
            article: Mongoose.Types.ObjectId(req?.query?.article),
          },
        ],
      };
    }

    const result = await ImageService.getAll({
      ...req.query,
      query,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const result = await ImageService.getOne(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await ImageService.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await ImageService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await ImageService.deleteOne(req.params.id);
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
