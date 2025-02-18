import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const estabelecimentos = await models.Estabelecimentos.findAll({
      attributes: ['id', 'nome', 'pessoa_juridica_id', 'endereco_id'],
      order: [['nome', 'ASC']],
      include: [
        {
          model: models.PessoasJuridicas,
          attributes: ['razao_social'],
          include: [{
            model: models.Pessoas,
            attributes: ['nome']
          }]
        },
        {
          model: models.Enderecos,
          attributes: ['numero', 'complemento'],
          include: [{
            model: models.Logradouros,
            attributes: ['nome']
          }]
        }
      ]
    });
    return NextResponse.json(estabelecimentos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch estabelecimentos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.pessoa_juridica_id || !data.endereco_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Nome, pessoa_juridica_id and endereco_id are required' },
        { status: 400 }
      );
    }

    const estabelecimento = await models.Estabelecimentos.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(estabelecimento, {
      status: 201,
      headers: {
        'Location': `/api/estabelecimentos/${estabelecimento.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create estabelecimento', details: error.message },
      { status: 500 }
    );
  }
}
