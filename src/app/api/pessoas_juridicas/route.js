import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const pessoasJuridicas = await models.PessoasJuridicas.findAll({
      attributes: ['id', 'cnpj', 'razao_social', 'nome_fantasia', 'pessoa_id'],
      order: [['razao_social', 'ASC']],
      include: [{
        model: models.Pessoas,
        attributes: ['nome']
      }]
    });
    return NextResponse.json(pessoasJuridicas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pessoas juridicas', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const pessoaJuridica = await models.PessoasJuridicas.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(pessoaJuridica, {
      status: 201,
      headers: {
        'Location': `/api/pessoas_juridicas/${pessoaJuridica.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create pessoa juridica', details: error.message },
      { status: 500 }
    );
  }
}
