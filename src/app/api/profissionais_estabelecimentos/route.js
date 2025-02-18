import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const profissionaisEstabelecimentos = await models.ProfissionaisEstabelecimentos.findAll({
      attributes: ['id', 'profissional_id', 'estabelecimento_id'],
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
    return NextResponse.json(profissionaisEstabelecimentos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profissionais estabelecimentos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const profissionalEstabelecimento = await models.ProfissionaisEstabelecimentos.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(profissionalEstabelecimento, {
      status: 201,
      headers: {
        'Location': `/api/profissionais_estabelecimentos/${profissionalEstabelecimento.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create profissional estabelecimento', details: error.message },
      { status: 500 }
    );
  }
}
