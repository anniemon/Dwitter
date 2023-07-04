import { sequelize } from '../db/database.js';
import SQ from 'sequelize';
import { User } from './users.js'
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
)

Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
  'id',
  'text',
  'createdAt',
  'userId',
  [Sequelize.col('user.name'), 'name'],
  [Sequelize.col('user.url'), 'url'],
  [Sequelize.col('user.username'), 'username'],
],
  include: {model: User, attributes: []}
};
const ORDER_DESC = {order: [['createdAt', 'DESC']]};

export async function getAll() {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
  })
}

export async function getByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
    ...ORDER_DESC,
  })
}

export async function findById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(text, userId) {
  return Tweet.create({text, userId}).then(data =>
    findById(data.dataValues.id)
  );
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER)
  .then(tweet => {
    tweet.text = text;
    return tweet.save();
  });
}

export async function remove(id) {
  return Tweet.findByPk(id)
  .then(tweet => {
    tweet.destroy();
  });
}
