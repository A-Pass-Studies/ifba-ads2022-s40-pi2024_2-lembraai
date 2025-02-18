import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const historicoAgendamento = await models.HistoricoAgendamento.findByPk(params.id, {
      attributes: ['id', 'agendamento_id', 'status_anterior', 'status_novo', 'data_modificacao', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Agendamentos,
        attributes: ['data_hora']
      }]
    });
    
    if (!historicoAgendamento) {
      return NextResponse.json(
        { error: `HistoricoAgendamento with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(historicoAgendamento);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch historico agendamento', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const historicoAgendamento = await models.HistoricoAgendamento.findByPk(params.id, { transaction });
    if (!historicoAgendamento) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `HistoricoAgendamento with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await historicoAgendamento.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(historicoAgendamento);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update historico agendamento', details: error.message },
      { status: 500 }
    );
  }
}
