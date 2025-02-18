import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const agendamento = await models.Agendamentos.findByPk(params.id, {
      attributes: ['id', 'data_hora', 'status', 'cliente_id', 'profissional_servico_id', 'createdAt', 'updatedAt'],
      include: [
        {
          model: models.Pessoas,
          as: 'Cliente',
          attributes: ['nome']
        },
        {
          model: models.ProfissionaisServicos,
          attributes: [],
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
        }
      ]
    });
    
    if (!agendamento) {
      return NextResponse.json(
        { error: `Agendamento with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(agendamento);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agendamento', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.data_hora || !data.cliente_id || !data.profissional_servico_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'data_hora, cliente_id and profissional_servico_id are required' },
        { status: 400 }
      );
    }

    const agendamento = await models.Agendamentos.findByPk(params.id, { transaction });
    if (!agendamento) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Agendamento with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await agendamento.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(agendamento);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update agendamento', details: error.message },
      { status: 500 }
    );
  }
}
