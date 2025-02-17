import { NextResponse } from 'next/server';
import { models, sequelize } from '@/src/database/models';

export async function GET(request, { params }) {
  try {
    const endereco = await models.Enderecos.findByPk(params.id, {
      attributes: ['id', 'logradouro_id', 'numero', 'complemento', 'createdAt', 'updatedAt'],
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
    
    if (!endereco) {
      return NextResponse.json(
        { error: `Endereco with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(endereco);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch endereco', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const endereco = await models.Enderecos.findByPk(params.id, { transaction });
    if (!endereco) {
      await transaction.rollback();
      return NextResponse.json(
        { error: `Endereco with ID ${params.id} not found` },
        { status: 404 }
      );
    }

    await endereco.update(data, { transaction });
    await transaction.commit();
    
    return NextResponse.json(endereco);
  } catch (error) {
    await transaction.rollback();
    return NextResponse.json(
      { error: 'Failed to update endereco', details: error.message },
      { status: 500 }
    );
  }
}
