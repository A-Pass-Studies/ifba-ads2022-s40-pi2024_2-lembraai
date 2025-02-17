import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const usuarios = await models.Usuarios.findAll({
      attributes: ['id', 'email', 'tipo', 'pessoa_id'],
      order: [['email', 'ASC']]
    });
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch usuarios', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.senha || !data.tipo || !data.pessoa_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Email, senha, tipo and pessoa_id are required' },
        { status: 400 }
      );
    }

    const usuario = await models.Usuarios.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(usuario, {
      status: 201,
      headers: {
        'Location': `/api/usuarios/${usuario.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create usuario', details: error.message },
      { status: 500 }
    );
  }
}
