import Mongoose from 'mongoose';
import MainService from '../services/MainService';
import PlaceModel from '../models/Place';

const PlaceService = new MainService(PlaceModel, 'category');

export const onReadAll = async (req, res) => {
  try {
    let query = {};
    if (req?.query?.name) {
      query = {
        $or: [
          {
            name: {
              $regex: req?.query?.name,
            },
          },
          {
            type_code: {
              $regex: req?.query?.name,
            },
          },
        ],
      };
    }

    if (req?.query?.place) {
      query = {
        $or: [
          {
            place: Mongoose.Types.ObjectId(req?.query?.place),
          },
        ],
      };
    }

    const result = await PlaceService.getAll({
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
    const result = await PlaceService.getOne(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await PlaceService.createOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await PlaceService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await PlaceService.deleteOne(req.params.id);
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
