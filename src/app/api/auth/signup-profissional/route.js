import { NextResponse } from 'next/server';
import { models, sequelize } from '../../../../database/models';
import PasswordCrypt from '@/helpers/PasswordCrypt';
import {StatusCodes} from 'http-status-codes';
import process from 'process';
import {SignJWT} from 'jose';
import enums from '@/database/models/enums';
import estabelecimentos from '@/database/models/estabelecimentos';

const TOKEN_SECRET = process.TOKEN_SECRET;

/**
 * 
 * @param {FormData} data 
 */
function extractData(data) {
    const pessoa = {
        nome: data.get('nome'),
        nascimento: data.get('nascimento'),
        sexo: data.get('sexo'),
        cpf: data.get('cpf'),
        celular: data.get('telefoneOuCelular'),
    };


    const razao_social = data.get('razaoSocial');
    const cnpj = data.get('cnpj');
    
    let pessoaJuridica = null;
    if(razao_social !== null && cnpj !== null) {
        pessoaJuridica = {razao_social, cnpj};
    }

    const estabelecimento = {
        foto_estabelecimento: data.get('fotoEstabelecimento'),
        logo_estabelecimento: data.get('logoEstabelecimento'),
        descricao: data.get('descricao'),
        nome_comercial: data.get('nomeFantasia'),
        atende_masculino: data.get('atendeMasculino') || false,
        atende_feminino: data.get('atendeFeminino') || false
    }

    const enderecoEstabelecimento = {
        logradouro: {
            nome: data.get('enderecoLogradouro'),
            tipo: enums.TipoLogradouro.OUTROS,
            cep: data.get('enderecoCep')
        },
        bairro: {
            nome: data.get('enderecoBairro'),
        },
        cidade: {
            nome: data.get("enderecoCidade"),
            uf: data.get('enderecoEstado'),
            cepGenerico: data.get('enderecoCep')
        },
        endereco: {
            numero: data.get('enderecoNumero'),
            complemento: data.get('enderecoComeplemento'),
            referencias: data.get('enderecoReferencia')
        }
    }

    const user = {
        email: data.get('email'),
        senha: data.get('senha')
    }

    return {pessoa, user, pessoaJuridica, estabelecimento, enderecoEstabelecimento};
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
        if(data.pessoaJuridica != null) {
            data.pessoaJuridica.pessoa_id = pessoa.id;
            await models.PessoasJuridicas.create(data.pessoaJuridica, { transaction });
        }
        const cidade = await models.Cidades.create(data.enderecoEstabelecimento.cidade, { transaction });
        data.enderecoEstabelecimento.bairro.cidade_id = cidade.id;
        const bairro = await models.Bairros.create(data.enderecoEstabelecimento.bairro, { transaction });
        data.enderecoEstabelecimento.logradouro.bairro_id = bairro.id;
        const logradouro = await models.Logradouros.create(data.enderecoEstabelecimento.logradouro, { transaction });
        data.enderecoEstabelecimento.endereco.logradouro_id = logradouro.id;
        const endereco = await models.Enderecos.create(data.enderecoEstabelecimento.endereco, { transaction });

        data.estabelecimento.endereco_id = endereco.id
        data.estabelecimento.pessoa_registrou_id = pessoa.id;
        const estabelecimento = await models.Estabelecimentos.create(data.estabelecimento, { transaction });

        await models.ProfissionaisEstabelecimentos.create({
            pessoa_profissional_id: pessoa.id,
            estabelecimento_id: estabelecimento.id,
            dono: true
        }, { transaction });

        await transaction.commit();

        const token = await new SignJWT({user: usuario.email})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(new TextEncoder().encode(TOKEN_SECRET));

        return new Response(token, {
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
