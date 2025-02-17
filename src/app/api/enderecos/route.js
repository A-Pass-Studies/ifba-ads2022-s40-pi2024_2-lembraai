import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET() {
  try {
    const enderecos = await models.Enderecos.findAll({
      attributes: ['id', 'logradouro_id', 'numero', 'complemento'],
      include: [{
        model: models.Logradouros,
        attributes: ['nome'],
        include: [{
          model: models.Bairros,
          attributes: ['nome'],
          include: [{
            model: models.Cidades,
            attributes: ['nome']
          }]
        }]
      }]
    });
    return NextResponse.json(enderecos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch enderecos', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const transaction = await sequelize.transaction();
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.logradouro_id || !data.numero) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'logradouro_id and numero are required' },
        { status: 400 }
      );
    }

    const endereco = await models.Enderecos.create(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(endereco, {
      status: 201,
      headers: {
        'Location': `/api/enderecos/${endereco.id}`
      }
    });
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to create endereco', details: error.message },
      { status: 500 }
    );
  }
}
