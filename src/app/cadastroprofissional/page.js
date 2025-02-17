"use client";

import React from "react";
import Link from "next/link";

export default function CadastroProfissional() {
  return (
    <div>
      {/* Top Bar */}
      <div id="top-bar1">
        <div className="imgseta">
          <Link href="./registrogeral">
            <img src="arrow-back-icon.svg" alt="Voltar" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* Cadastro */}
      <h2>Cadastro Profissional</h2>

      <div className="imgcadastro">
        <img src="ic_profissional 1.png" alt="Ícone Profissional" />
      </div>

      {/* Botões de Login */}
      <div className="botão-entrar-com">
        <button className="bec">Entre com Google</button>
        <button className="bec">Entre com ICloud</button>
      </div>

      {/* Formulário */}
      <div className="form-container">
        <form>
          <input className="input" type="text" id="nome" name="nome" placeholder="Digite seu nome" required />
          <br />

          <input className="input" type="date" id="data" name="data" placeholder="Digite sua data de nascimento" required />
          <br />

          {/* Gênero */}
          <div className="genero">
            <input type="radio" id="masculino" name="genero" value="Masculino" required />
            <label htmlFor="masculino" className="btn">Masculino</label>

            <input type="radio" id="feminino" name="genero" value="Feminino" />
            <label htmlFor="feminino" className="btn">Feminino</label>
          </div>
          <br />

          <input className="input" type="email" id="email" name="email" placeholder="Digite seu e-mail" required />
          <br />

          <input className="input" type="password" id="senha" name="senha" placeholder="Digite sua senha" required />
          <br />

          <input className="input" type="password" id="confirma_senha" name="confirma_senha" placeholder="Confirme sua senha" required />
          <br />

          <div className="botãoCadas">
            <button className="bt-cadastro" type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
