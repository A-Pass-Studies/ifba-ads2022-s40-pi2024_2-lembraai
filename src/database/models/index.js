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

const Usuarios = _Usuarios(sequelize, DataTypes);
const Cidades = _Cidades(sequelize, DataTypes);
const Bairros = _Bairros(sequelize, DataTypes);
const Logradouros = _Logradouros(sequelize, DataTypes);
const Enderecos = _Enderecos(sequelize, DataTypes);
const Pessoas = _Pessoas(sequelize, DataTypes, Enderecos);
const PessoasJuridicas = _PessoasJuridicas(sequelize, DataTypes);
const Estabelecimentos = _Estabelecimentos(sequelize, DataTypes);
const ProfissionaisEstabelecimentos = _ProfissionaisEstabelecimentos(sequelize, DataTypes);
const Servicos = _Servicos(sequelize, DataTypes);
const ProfissionaisServicos = _ProfissionaisServicos(sequelize, DataTypes);
const Agendamentos = _Agendamentos(sequelize, DataTypes);
const HistoricoAgendamento = _HistoricoAgendamento(sequelize, DataTypes);

const models = {
  Usuarios, Cidades, Cidades, Bairros, Logradouros, Enderecos, Pessoas, PessoasJuridicas, Estabelecimentos, ProfissionaisEstabelecimentos, Servicos, ProfissionaisServicos, Agendamentos, HistoricoAgendamento
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

export { sequelize, models };
export default models;
