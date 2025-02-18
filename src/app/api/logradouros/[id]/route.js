import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const logradouro = await models.Logradouros.findByPk(params.id, {
      attributes: ['id', 'nome', 'bairro_id', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Bairros,
        attributes: ['nome'],
        include: [{
          model: models.Cidades,
          attributes: ['nome']
        }]
      }]
    });
    
    if (!logradouro) {
      return NextResponse.json(
        { error: `Logradouro with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(logradouro);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch logradouro', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const logradouro = await models.Logradouros.findByPk(params.id, { transaction });
    if (!logradouro) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Logradouro with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await logradouro.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(logradouro);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update logradouro', details: error.message },
      { status: 500 }
    );
  }
}
