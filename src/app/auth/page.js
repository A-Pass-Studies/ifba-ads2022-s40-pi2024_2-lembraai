'use strict';
'use client';

import React from "react"
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); 
    const urlEncodedData = new URLSearchParams(formData).toString(); 

    // Envie os dados de login para a API de autenticação
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': e.target.enctype },
      body: urlEncodedData,
    });

    if (res.ok) {
      router.push('/home');
    } else {
      alert('Falha na autenticação');
    }
  };

    return (
        <div className="bodyLogin">
        <img
          src="lembraai-logo.png"
          alt="logo"
          className="login-logo"
          width={232}
          height={142}
        />
  
        <form className="login-form" onSubmit={handleSubmit} method="POST">
          <input type="email" placeholder="E-mail" name="email" required />
  
          <input type="password" placeholder="Senha" name="senha" required />
  
          <button type="submit">
            Entrar
          </button>
          
          <a href="./registrogeral">Não é usuário? Cadastre-se</a>
        </form>
      </div>
    )
}