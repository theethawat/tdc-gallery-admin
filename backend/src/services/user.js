import _ from 'lodash';

import UserModel from '../models/User';
import middleware from '../middleware/auth';
import config from '../configs/app';

export const readAllUser = async ({ page = 1, size = config.defaultLimit }) => {
  try {
    const user = await UserModel.find({}, null, {
      skip: (page - 1) * size,
      limit: size,
    });
    const payload = { rows: user, total: _.size(user) };
    return payload;
  } catch (error) {
    throw Error('DB_FALSE_READ Database fetching have problem', error);
  }
};

export const readOneUser = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    throw Error('DB_FALSE_READ Database fetching have problem', error);
  }
};

export const getUserAfterLogin = async (data) => {
  try {
    const payload = {
      ...data,
      authToken: middleware.generateToken({ username: data?.username }),
    };
    return payload;
  } catch (error) {
    throw Error('LOGIN_FAIL Logging in Fail cannot find user');
  }
};

export const createOneUser = async (payload) => {
  try {
    const user = new UserModel(payload);
    await user.save();
    return user;
  } catch (error) {
    throw Error('DB_FALSE_CREATE Database creating have problem', error);
  }
};

export const updateOneUser = async (id, payload) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { $set: payload });
    return user;
  } catch (error) {
    throw Error('DB_FALSE_EDIT Database creating have problem', error);
  }
};

export const deleteOneUser = async (id) => {
  try {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw Error('DB_FALSE_DELETE Database creating have problem', error);
  }
};

export default {
  createOneUser,
  readAllUser,
  readOneUser,
  updateOneUser,
  deleteOneUser,
  getUserAfterLogin,
};
