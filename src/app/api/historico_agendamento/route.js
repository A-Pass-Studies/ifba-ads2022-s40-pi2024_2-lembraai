import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const historicoAgendamentos = await models.HistoricoAgendamento.findAll({
      attributes: ['id', 'agendamento_id', 'status_anterior', 'status_novo', 'data_modificacao'],
      order: [['data_modificacao', 'DESC']],
      include: [{
        model: models.Agendamentos,
        attributes: ['data_hora']
      }]
    });
    return NextResponse.json(historicoAgendamentos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch historico agendamentos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.agendamento_id || !data.status_anterior || !data.status_novo) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'agendamento_id, status_anterior and status_novo are required' },
        { status: 400 }
      );
    }

    const historicoAgendamento = await models.HistoricoAgendamento.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(historicoAgendamento, {
      status: 201,
      headers: {
        'Location': `/api/historico_agendamento/${historicoAgendamento.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create historico agendamento', details: error.message },
      { status: 500 }
    );
  }
}
