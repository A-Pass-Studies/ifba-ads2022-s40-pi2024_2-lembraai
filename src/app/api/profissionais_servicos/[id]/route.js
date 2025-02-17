import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const profissionalServico = await models.ProfissionaisServicos.findByPk(params.id, {
      attributes: ['id', 'profissional_id', 'servico_id', 'createdAt', 'updatedAt'],
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
    
    if (!profissionalServico) {
      return NextResponse.json(
        { error: `ProfissionalServico with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(profissionalServico);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profissional servico', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const profissionalServico = await models.ProfissionaisServicos.findByPk(params.id, { transaction });
    if (!profissionalServico) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `ProfissionalServico with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await profissionalServico.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(profissionalServico);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update profissional servico', details: error.message },
      { status: 500 }
    );
  }
}
