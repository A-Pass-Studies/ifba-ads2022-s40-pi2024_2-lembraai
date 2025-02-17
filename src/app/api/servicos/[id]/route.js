import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const servico = await models.Servicos.findByPk(params.id, {
      attributes: ['id', 'nome', 'descricao', 'duracao', 'valor', 'estabelecimento_id', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Estabelecimentos,
        attributes: ['nome']
      }]
    });
    
    if (!servico) {
      return NextResponse.json(
        { error: `Servico with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(servico);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch servico', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.duracao || !data.valor || !data.estabelecimento_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Nome, duracao, valor and estabelecimento_id are required' },
        { status: 400 }
      );
    }

    const servico = await models.Servicos.findByPk(params.id, { transaction });
    if (!servico) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Servico with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await servico.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(servico);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update servico', details: error.message },
      { status: 500 }
    );
  }
}
