import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const pessoa = await models.Pessoas.findByPk(params.id, {
      attributes: ['id', 'nome', 'cpf', 'endereco_id', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Enderecos,
        attributes: ['numero', 'complemento'],
        include: [{
          model: models.Logradouros,
          attributes: ['nome'],
          include: [{
            model: models.Bairros,
            attributes: ['nome'],
            include: [{
              model: models.Cidades,
              attributes: ['nome']
            }]
          }]
        }]
      }]
    });
    
    if (!pessoa) {
      return NextResponse.json(
        { error: `Pessoa with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(pessoa);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pessoa', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.cpf || !data.endereco_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Nome, CPF and endereco_id are required' },
        { status: 400 }
      );
    }

    const pessoa = await models.Pessoas.findByPk(params.id, { transaction });
    if (!pessoa) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Pessoa with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await pessoa.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(pessoa);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update pessoa', details: error.message },
      { status: 500 }
    );
  }
}
