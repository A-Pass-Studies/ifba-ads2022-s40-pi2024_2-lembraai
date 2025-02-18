import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const profissionaisServicos = await models.ProfissionaisServicos.findAll({
      attributes: ['id', 'profissional_id', 'servico_id'],
      include: [
        {
          model: models.Pessoas,
          as: 'Profissional',
          attributes: ['nome']
        },
        {
          model: models.Servicos,
          attributes: ['nome']
        }
      ]
    });
    return NextResponse.json(profissionaisServicos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profissionais servicos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.profissional_id || !data.servico_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'profissional_id and servico_id are required' },
        { status: 400 }
      );
    }

    const profissionalServico = await models.ProfissionaisServicos.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(profissionalServico, {
      status: 201,
      headers: {
        'Location': `/api/profissionais_servicos/${profissionalServico.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create profissional servico', details: error.message },
      { status: 500 }
    );
  }
}
