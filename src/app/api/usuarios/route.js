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

