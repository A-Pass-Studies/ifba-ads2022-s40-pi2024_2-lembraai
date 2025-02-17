"use client";

import React from "react";
import Link from "next/link";

export default function Cadastrocliente() {
  return (
    <div>
      {/* Top Bar */}
      <div id="top-bar1">
        <div className="imgseta">
          <Link href="/login">
            <img src="/arrow-back-icon.svg" alt="arrow-back-icon" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* Cadastro Cliente */}
      <div>
        <h2>Cadastro Cliente</h2>

        <div className="imgcadastro">
          <img src="ic_cliente 1.png" alt="Ícone Cliente" />
        </div>

        {/* Botões de login */}
        <div className="botão-entrar-com">
          <button className="bec">Entre com Google</button>
          <button className="bec">Entre com iCloud</button>
        </div>

        {/* Formulário */}
        <div className="form-container">
          <form>
            <input className="input" type="text" id="nome" name="nome" placeholder="Digite seu nome" required /><br />

            <input className="input" type="date" id="data" name="data" required /><br />

            {/* Gênero */}
            <div>
              <div className="genero">
                <input type="radio" id="masculino" name="genero" value="Masculino" />
                <label htmlFor="masculino" className="btn">Masculino</label>

                <input type="radio" id="feminino" name="genero" value="Feminino" />
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