import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const bairros = await models.Bairros.findAll({
      attributes: ['id', 'nome', 'cidade_id'],
      order: [['nome', 'ASC']],
      include: [{
        model: models.Cidades,
        attributes: ['nome']
      }]
    });
    return NextResponse.json(bairros);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bairros', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.cidade_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Nome and cidade_id are required' },
        { status: 400 }
      );
    }

    const bairro = await models.Bairros.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(bairro, {
      status: 201,
      headers: {
        'Location': `/api/bairros/${bairro.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create bairro', details: error.message },
      { status: 500 }
    );
  }
}
