import UserService from '../services/user';

export const onReadAll = async (req, res) => {
  try {
    console.log('On Read All User');
    const result = await UserService.readAllUser();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const result = await UserService.readOneUser(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onLogin = async (req, res) => {
  try {
    console.log('On Login');
    const result = await UserService.getUserAfterLogin(req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(403).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    const result = await UserService.createOneUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await UserService.updateOneUser(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await UserService.deleteOneUser(req.params.id);
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
  onLogin,
};
