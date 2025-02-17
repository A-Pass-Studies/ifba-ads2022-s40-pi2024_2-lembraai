import { Sequelize, DataTypes}  from 'sequelize';
import config from '../config/config';

import _Usuarios from './usuarios';
import _Cidades from './cidades';
import _Bairros from './bairros';
import _Logradouros from './logradouros';
import _Enderecos from './enderecos';
import _Pessoas from './pessoas';
import _PessoasJuridicas from './pessoasjuridicas';
import _Estabelecimentos from './estabelecimentos';
import _ProfissionaisEstabelecimentos from './profissionaisestabelecimentos';
import _Servicos from './servicos';
import _ProfissionaisServicos from './profissionaisservicos';
import _Agendamentos from './agendamentos';
import _HistoricoAgendamento from './historicoagendamento';

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
  Usuarios: _Usuarios(sequelize, DataTypes),
  Cidades: _Cidades(sequelize, DataTypes),
  Bairros: _Bairros(sequelize, DataTypes),
  Logradouros: _Logradouros(sequelize, DataTypes),
  Enderecos: _Enderecos(sequelize, DataTypes),
  Pessoas: _Pessoas(sequelize, DataTypes),
  PessoasJuridicas: _PessoasJuridicas(sequelize, DataTypes),
  Estabelecimentos: _Estabelecimentos(sequelize, DataTypes),
  ProfissionaisEstabelecimentos: _ProfissionaisEstabelecimentos(sequelize, DataTypes),
  Servicos: _Servicos(sequelize, DataTypes),
  ProfissionaisServicos: _ProfissionaisServicos(sequelize, DataTypes),
  Agendamentos: _Agendamentos(sequelize, DataTypes),
  HistoricoAgendamento: _HistoricoAgendamento(sequelize, DataTypes),
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

export { sequelize, models };
export default models;
