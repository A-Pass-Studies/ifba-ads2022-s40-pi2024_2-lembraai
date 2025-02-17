import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const pessoaJuridica = await models.PessoasJuridicas.findByPk(params.id, {
      attributes: ['id', 'cnpj', 'razao_social', 'nome_fantasia', 'pessoa_id', 'createdAt', 'updatedAt'],
      include: [{
        model: models.Pessoas,
        attributes: ['nome']
      }]
    });
    
    if (!pessoaJuridica) {
      return NextResponse.json(
        { error: `Pessoa juridica with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(pessoaJuridica);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pessoa juridica', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.cnpj || !data.razao_social || !data.pessoa_id) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'CNPJ, razao_social and pessoa_id are required' },
        { status: 400 }
      );
    }

    const pessoaJuridica = await models.PessoasJuridicas.findByPk(params.id, { transaction });
    if (!pessoaJuridica) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Pessoa juridica with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await pessoaJuridica.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(pessoaJuridica);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update pessoa juridica', details: error.message },
      { status: 500 }
    );
  }
}
