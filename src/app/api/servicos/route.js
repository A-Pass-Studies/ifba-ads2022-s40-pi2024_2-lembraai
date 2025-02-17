import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const servicos = await models.Servicos.findAll({
      attributes: ['id', 'nome', 'descricao', 'duracao', 'valor', 'estabelecimento_id'],
      order: [['nome', 'ASC']],
      include: [{
        model: models.Estabelecimentos,
        attributes: ['nome']
      }]
    });
    return NextResponse.json(servicos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch servicos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const servico = await models.Servicos.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(servico, {
      status: 201,
      headers: {
        'Location': `/api/servicos/${servico.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create servico', details: error.message },
      { status: 500 }
    );
  }
}
