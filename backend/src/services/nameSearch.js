export const nameSearch = (name, { people = false, typeCode = false } = {}) => {
  const search = { $regex: name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  const fields = ['name', 'translation.en.name', 'translation.th.name'];
  if (typeCode) fields.push('type_code');
  if (people) {
    fields.push(
      'calledName', 'nickname', 'called_name',
      'translation.en.calledName', 'translation.en.nickname',
      'translation.th.calledName', 'translation.th.nickname',
      'translation.ja.name', 'translation.ja.calledName', 'translation.ja.nickname',
    );
  }
  return { $or: fields.map((field) => ({ [field]: search })) };
};
