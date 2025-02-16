import process from 'process';
import pg from 'pg';

export default {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectModule: pg,
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
};
