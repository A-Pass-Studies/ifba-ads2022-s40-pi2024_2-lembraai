import Sequelize from 'sequelize';
import config from '../config/config';
import _usuarios from './usuarios';

const sequelize =  new Sequelize(config.database, config.username, config.password, config);
const usuarios = _usuarios(sequelize);

export default { sequelize, usuarios };
