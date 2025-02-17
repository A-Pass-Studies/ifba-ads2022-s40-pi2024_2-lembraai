import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const agendamentos = await models.Agendamentos.findAll({
      attributes: ['id', 'data_hora', 'status', 'cliente_id', 'profissional_servico_id'],
      order: [['data_hora', 'ASC']],
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
    return NextResponse.json(agendamentos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agendamentos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const agendamento = await models.Agendamentos.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(agendamento, {
      status: 201,
      headers: {
        'Location': `/api/agendamentos/${agendamento.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create agendamento', details: error.message },
      { status: 500 }
    );
  }
}
