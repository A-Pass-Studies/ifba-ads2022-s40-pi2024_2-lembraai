import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const cidade = await models.Cidades.findByPk(params.id, {
      attributes: ['id', 'nome', 'estado', 'createdAt', 'updatedAt']
    });
    
    if (!cidade) {
      return NextResponse.json(
        { error: `Cidade with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(cidade);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cidade', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.estado) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Nome and estado are required' },
        { status: 400 }
      );
    }

    const cidade = await models.Cidades.findByPk(params.id, { transaction });
    if (!cidade) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Cidade with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await cidade.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(cidade);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update cidade', details: error.message },
      { status: 500 }
    );
  }
}
