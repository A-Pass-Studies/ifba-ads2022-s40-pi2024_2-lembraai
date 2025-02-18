import { NextResponse } from 'next/server';
import { models, sequelize } from '../../../../database/models';
import PasswordCrypt from '@/helpers/PasswordCrypt';
import {StatusCodes} from 'http-status-codes';
import process from 'process';
import * as jose from 'jose';

/**
 * 
 * @param {FormData} data 
 */
function extractData(data) {
    const pessoa = {
        nome: data.get('nome'),
        nascimento: data.get('data_nascimento'),
        sexo: data.get('sexo'),
        cpf: data.get('cpf'),
        celular: data.get('celular'),
    };

    const user = {
        email: data.get('email'),
        senha: data.get('senha')
    }

    return {pessoa, user};
}

export async function POST(request) {
    const transaction = await sequelize.transaction();
    try {
        const data = extractData(await request.formData());
        
        // Validate required fields
        if (!data.user.email || !data.user.senha || !data.pessoa.nome) {
            await transaction.rollback();
            return NextResponse.json(
                { error: 'Nome, CPF, Endereço, E-mail, Senha, são obrigatórios!' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        data.user.senha = PasswordCrypt.encrypt(data.user.senha);
        const usuario = await models.Usuarios.create(data.user, { transaction });
        data.pessoa.id = usuario.id;
        data.pessoa.endereco_id = null;
        const pessoa = await models.Pessoas.create(data.pessoa, { transaction });
        await transaction.commit();

        const token = await jwt.sign({user: usuario.email}, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        return Response(token, {
            status: StatusCodes.CREATED,
            headers: {
                'Location': `/api/pessoas/${pessoa.id}`
            }
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return NextResponse.json(
            { error: 'Failed to create usuario', details: error.message },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
