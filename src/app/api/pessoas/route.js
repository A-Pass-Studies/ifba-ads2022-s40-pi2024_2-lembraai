import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const pessoas = await models.Pessoas.findAll({
      attributes: ['id', 'nome', 'cpf', 'endereco_id'],
      order: [['nome', 'ASC']],
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
    return NextResponse.json(pessoas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pessoas', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const pessoa = await models.Pessoas.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(pessoa, {
      status: 201,
      headers: {
        'Location': `/api/pessoas/${pessoa.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create pessoa', details: error.message },
      { status: 500 }
    );
  }
}
