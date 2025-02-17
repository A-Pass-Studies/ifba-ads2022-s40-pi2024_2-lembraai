import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const bairro = await models.Bairros.findByPk(params.id, {
      attributes: ['id', 'nome', 'cidade_id', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Cidades,
        attributes: ['nome']
      }]
    });
    
    if (!bairro) {
      return NextResponse.json(
        { error: `Bairro with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(bairro);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bairro', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const bairro = await models.Bairros.findByPk(params.id, { transaction });
    if (!bairro) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Bairro with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await bairro.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(bairro);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update bairro', details: error.message },
      { status: 500 }
    );
  }
}
