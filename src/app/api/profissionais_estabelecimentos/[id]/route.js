import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const profissionalEstabelecimento = await models.ProfissionaisEstabelecimentos.findByPk(params.id, {
      attributes: ['id', 'profissional_id', 'estabelecimento_id', 'createdAt', 'updatedAt'],
      include: [
        {
          model: models.Pessoas,
          as: 'Profissional',
          attributes: ['nome']
        },
        {
          model: models.Estabelecimentos,
          attributes: ['nome']
        }
      ]
    });
    
    if (!profissionalEstabelecimento) {
      return NextResponse.json(
        { error: `ProfissionalEstabelecimento with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(profissionalEstabelecimento);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profissional estabelecimento', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.profissional_id || !data.estabelecimento_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'profissional_id and estabelecimento_id are required' },
        { status: 400 }
      );
    }

    const profissionalEstabelecimento = await models.ProfissionaisEstabelecimentos.findByPk(params.id, { transaction });
    if (!profissionalEstabelecimento) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `ProfissionalEstabelecimento with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await profissionalEstabelecimento.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(profissionalEstabelecimento);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update profissional estabelecimento', details: error.message },
      { status: 500 }
    );
  }
}
