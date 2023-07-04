import { sequelize } from '../db/database.js'
import SQ from 'sequelize';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  url: DataTypes.TEXT,
},
  { timestamps: false }
)

export async function create(name, username, password, email, url = "") {
  return User.create({name, username, password, email, url}).then(data => data.dataValues.id)
}

export async function get(username, requirePassword = false) {
  return User.findOne({ where: { username } }).then(data => data);
}

export async function findById(id) {
  return User.findByPk(id);
}
