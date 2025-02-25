import models from '../../../database/models';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ValidationError, FieldError } from '../../../exception/ValidationException';
import { NextResponse } from 'next/server';
import PasswordCrypt from '@/helpers/PasswordCrypt';
import {SignJWT} from 'jose';
import process from 'process';

const TOKEN_SECRET = process.env.TOKEN_SECRET

function createUnautorizedResponse() {
  return new Response(ReasonPhrases.UNAUTHORIZED, {
    status: StatusCodes.UNAUTHORIZED
  });
}

function validateData(data) {
  const fieldEmail = 'email';
  const email = data.get(fieldEmail);

  /**
   * @type {ValidationError | null}
   */
  let erros = null;

  if(!email) {
    erros = errs || new ValidationError();
    erros.addFieldError(new FieldError(fieldEmail, [`O campo ${fieldEmail} é obrigatório!`,]));
  }

  const fieldSenha = 'senha';
  const senha = data.get(fieldSenha);

  if(!senha) {
    erros = erros || new ValidationError();
    erros.addFieldError(new FieldError(fieldSenha, [`O campo ${fieldSenha} é obrigatório!`,]));
  }

  if (erros != null) {
    throw erros;
  }

  return { email, senha };
}

export async function POST(req) {
  try {
    const {email, senha} = validateData(await req.formData());

    const user = await models.Usuarios.findOne({
      where: { email }
    });

    if(!user) {
      return createUnautorizedResponse();
    }

    const validPassword = PasswordCrypt.compare(senha, user.senha);
    if(!validPassword){
      return createUnautorizedResponse();
    }

    const token = await new SignJWT({user: user.email})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(new TextEncoder().encode(TOKEN_SECRET));

    return new Response(token, {
      status: StatusCodes.OK
    });

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(validationsError, {
        status: StatusCodes.BAD_REQUEST
      })
    } else {
      throw error;
    }
  }
}
