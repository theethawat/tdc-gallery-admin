const { test } = require('node:test');
const assert = require('node:assert/strict');
const { nameSearch } = require('../src/services/nameSearch');
const { GalleryArticle, DiaryArticle } = require('../src/models/Article');
const Category = require('../src/models/Category').default;
const Place = require('../src/models/Place').default;
const People = require('../src/models/People').default;

test('searches translated and legacy names using literal case-insensitive text', () => {
  const query = nameSearch('A.*');
  assert.deepEqual(query.$or.map((entry) => Object.keys(entry)[0]), [
    'name', 'translation.en.name', 'translation.th.name',
  ]);
  const pattern = query.$or[0].name;
  assert.equal(pattern.$options, 'i');
  assert.equal(new RegExp(pattern.$regex, pattern.$options).test('a.*'), true);
  assert.equal(new RegExp(pattern.$regex, pattern.$options).test('anything'), false);
  const peopleFields = nameSearch('x', { people: true }).$or.map((entry) => Object.keys(entry)[0]);
  assert.ok(peopleFields.includes('translation.ja.calledName'));
  assert.ok(peopleFields.includes('calledName'));
  assert.ok(nameSearch('x', { typeCode: true }).$or.some((entry) => entry.type_code));
});

test('models preserve the submitted multilingual fields', () => {
  const translation = {
    en: { name: 'English', description: 'English text', nickname: 'Nick', calledName: 'Call' },
    th: { name: 'Thai', description: 'Thai text', nickname: 'ชื่อเล่น', calledName: 'ชื่อเรียก' },
    ja: { name: 'Japanese', nickname: 'Japanese nick', calledName: 'Japanese call' },
  };
  for (const Model of [GalleryArticle, DiaryArticle]) {
    const data = new Model({ translation }).toObject();
    assert.equal(data.translation.en.description, 'English text');
    assert.equal(data.translation.th.description, 'Thai text');
  }
  for (const Model of [Category, Place, People]) {
    const data = new Model({ translation }).toObject();
    assert.equal(data.translation.en.name, 'English');
    assert.equal(data.translation.th.name, 'Thai');
  }
  const person = new People({ translation }).toObject();
  assert.equal(person.translation.ja.calledName, 'Japanese call');
});
