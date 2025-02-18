import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const logradouros = await models.Logradouros.findAll({
      attributes: ['id', 'nome', 'bairro_id'],
      order: [['nome', 'ASC']],
      include: [{
        model: models.Bairros,
        attributes: ['nome'],
        include: [{
          model: models.Cidades,
          attributes: ['nome']
        }]
      }]
    });
    return NextResponse.json(logradouros);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch logradouros', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.bairro_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Nome and bairro_id are required' },
        { status: 400 }
      );
    }

    const logradouro = await models.Logradouros.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(logradouro, {
      status: 201,
      headers: {
        'Location': `/api/logradouros/${logradouro.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create logradouro', details: error.message },
      { status: 500 }
    );
  }
}
