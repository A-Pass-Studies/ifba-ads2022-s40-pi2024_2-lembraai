import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const cidades = await models.Cidades.findAll({
      attributes: ['id', 'nome', 'estado'],
      order: [['nome', 'ASC']]
    });
    return NextResponse.json(cidades);
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch cidades',
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
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

    const cidade = await models.Cidades.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(cidade, { 
      status: 201,
      headers: {
        'Location': `/api/cidades/${cidade.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json({ 
      error: 'Failed to create cidade',
      details: error.message 
    }, { status: 500 });
  }
}
