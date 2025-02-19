'use strict';
'use client';

import React from "react"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Container, TextField, Button, Stack, Box } from "@mui/material";
import { Login } from "@mui/icons-material";
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
      document.cookie = `auth-token=Bearer ${await res.text()}`;
      router.push('/ui/telaprincipal');
    } else {
      alert('Falha na autenticação');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container >
        <center><Image
          src="/lembraai-logo.png"
          alt="logo"
          className="login-logo"
          width={232}
          height={142}
        /></center>

        <form onSubmit={handleSubmit} method="POST">
          <Stack spacing={2}>
            <TextField variant="outlined" type="email" placeholder="E-mail" name="email" required margin="normal"/>

            <TextField variant="outlined" type="password" placeholder="Senha" name="senha" required margin="normal"/>

            <Button variant="contained" type="submit" endIcon={<Login/>}>
              Entrar
            </Button>

            <Button href="/ui/registrogeral">Não é usuário? Cadastre-se</Button>
            <Button href="/ui/auth/recovery">Esqueceu sua senha, recupere aqui...</Button>
          </Stack>
        </form>
      </Container>
    </Box>
  )
}