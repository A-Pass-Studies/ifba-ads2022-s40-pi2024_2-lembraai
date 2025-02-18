"use client";

import React from "react";
import Link from "next/link";
import Form from 'next/form'

export default function Cadastrocliente() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); 

    var object = {};
    const res = await fetch(e.target.action, {
      method: e.target.method.toUpperCase(),
      body: formData,
    });

    if (res.ok) {
      document.cookie = `auth-token=Bearer ${await res.text()}`;

      router.push('/ui/telaprincipal');
    } else {
      alert('Falha no cadastro!');
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div id="top-bar1">
        <div className="imgseta">
          <Link href="./registrogeral">
            <img src="/arrow-back-icon.svg" alt="arrow-back-icon" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* Cadastro Cliente */}
      <div>
        <h2>Cadastro Cliente</h2>

        <div className="imgcadastro">
          <img src="/ic_cliente 1.png" alt="Ícone Cliente" />
        </div>

        {/* Botões de login */}
        <div className="botão-entrar-com">
          <button className="bec">Entre com Google</button>
          <button className="bec">Entre com iCloud</button>
        </div>

        {/* Formulário */}
        <div className="form-container">
          <form onSubmit={handleSubmit} method="POST" action="/api/auth/signup-client" encType="application/json">
            <input className="input" type="text" id="nome" name="nome" placeholder="Digite seu nome" required /><br />

            <input className="input" type="text" id="cpf" name="cpf" placeholder="CPF" required="required"/>

            <input className="input" type="date" id="data" name="data_nascimento" required /><br />

            {/* Gênero */}
            <div>
              <div className="genero">
                <input type="radio" id="masculino" name="sexo" value="M" />
                <label htmlFor="masculino" className="btn">Masculino</label>

                <input type="radio" id="feminino" name="sexo" value="F" />
                <label htmlFor="feminino" className="btn">Feminino</label>
              </div>
            </div><br />

            <input className="input" type="email" id="email" name="email" placeholder="Digite seu e-mail" required /><br />

            <input className="input" type="password" id="senha" name="senha" placeholder="Digite sua senha" required /><br />

            <input className="input" type="password" id="confirma_senha" name="confirma_senha" placeholder="Confirme sua senha" required /><br />

            {/* Botão de cadastro */}
            <div className="botãoCadas">
              <button className="bt-cadastro" type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}