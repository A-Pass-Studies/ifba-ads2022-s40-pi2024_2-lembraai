import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const estabelecimento = await models.Estabelecimentos.findByPk(params.id, {
      attributes: ['id', 'nome', 'pessoa_juridica_id', 'endereco_id', 'createdAt', 'updatedAt'],
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
    
    if (!estabelecimento) {
      return NextResponse.json(
        { error: `Estabelecimento with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(estabelecimento);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch estabelecimento', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const estabelecimento = await models.Estabelecimentos.findByPk(params.id, { transaction });
    if (!estabelecimento) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Estabelecimento with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await estabelecimento.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(estabelecimento);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update estabelecimento', details: error.message },
      { status: 500 }
    );
  }
}
