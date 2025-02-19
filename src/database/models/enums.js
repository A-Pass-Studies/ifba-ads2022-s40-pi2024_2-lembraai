// enums/Uf.js
export const Uf = Object.freeze({
  AC: 'AC', AL: 'AL', AP: 'AP', AM: 'AM', BA: 'BA',
  CE: 'CE', DF: 'DF', ES: 'ES', GO: 'GO', MA: 'MA',
  MT: 'MT', MS: 'MS', MG: 'MG', PA: 'PA', PB: 'PB',
  PR: 'PR', PE: 'PE', PI: 'PI', RJ: 'RJ', RN: 'RN',
  RS: 'RS', RO: 'RO', RR: 'RR', SC: 'SC', SP: 'SP',
  SE: 'SE', TO: 'TO'
});

// enums/TipoLogradouro.js
export const TipoLogradouro = Object.freeze({
  RUA: 'Rua', PRACA: 'Praça', AVENIDA: 'Avenida',
  ZONA_RURAL: 'Zona Rural', CAMINHO: 'Caminho', BR: 'BR', OUTROS: 'Outros'
});

// enums/Sexo.js
export const Sexo = Object.freeze({
  MASCULINO: 'M', FEMININO: 'F'
});

// enums/StatusAgendamento.js
export const StatusAgendamento = Object.freeze({
  SOLICITADO: 'SOLICITADO', CONFIRMADO: 'CONFIRMADO', FINALIZADO: 'FINALIZADO',
  REAGENDADO_CLIENTE: 'REAGENDADO_CLIENTE', REAGENDADO_PROFISSIONAL: 'REAGENDADO_PROFISSIONAL',
  CANCELADO_CLIENTE: 'CANCELADO_CLIENTE', CANCELADO_PROFISSIONAL: 'CANCELADO_PROFISSIONAL', RECUSADO: 'RECUSADO'
});

export default { Uf, TipoLogradouro, Sexo, StatusAgendamento };