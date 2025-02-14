"use client";

import React from "react"

export default function Home() {
    return (
        <div>
        <img
          src="lembraai-logo.png"
          alt="logo"
          className="login-logo"
          width={232}
          height={142}
        />
  
        <div className="login-form">
          <input type="email" placeholder="E-mail" name="uname" required />
  
          <input type="password" placeholder="Senha" name="psw" required />
  
          <button type="submit" onClick={() => (window.location.href = "./telaprincipal")}>
            Entrar
          </button>
          
          <a href="registro.html">Não é usuário? Cadastre-se</a>
        </div>
      </div>
    )
}