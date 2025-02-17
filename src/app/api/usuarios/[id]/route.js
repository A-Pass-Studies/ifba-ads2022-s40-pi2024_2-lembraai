import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const usuario = await models.Usuarios.findByPk(params.id, {
      attributes: ['id', 'email', 'tipo', 'pessoa_id', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Pessoas,
        attributes: ['nome']
      }]
    });
    
    if (!usuario) {
      return NextResponse.json(
        { error: `Usuario with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch usuario', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.tipo || !data.pessoa_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Email, tipo and pessoa_id are required' },
        { status: 400 }
      );
    }

    const usuario = await models.Usuarios.findByPk(params.id, { transaction });
    if (!usuario) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Usuario with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await usuario.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(usuario);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update usuario', details: error.message },
      { status: 500 }
    );
  }
}
