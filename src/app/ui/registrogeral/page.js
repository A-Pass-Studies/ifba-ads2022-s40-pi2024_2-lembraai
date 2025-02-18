"use client";

import React from "react";
import Link from "next/link";

export default function Registrogeral() {
  return (
    <div>
      {/* Top Bar */}
      <div id="top-bar">
        <Link href="/ui/auth">
          <img src="/arrow-back-icon.svg" alt="Voltar para login" width={48} height={48} />
        </Link>
      </div>

      {/* Registro */}
      <div id="registro">
        <p>Como você deseja se registrar?</p>

        <Link href="/ui/cadastrocliente">
          <img src="/registro-cliente.png" alt="Cadastro Cliente" />
        </Link>

        <Link href="/ui/cadastroprofissional">
          <img src="/registro-profissional.png" alt="Cadastro Profissional" />
        </Link>
      </div>
    </div>
  );
}