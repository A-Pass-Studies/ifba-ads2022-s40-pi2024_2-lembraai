'use server'

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'

const SECRET_KEY = process.env.TOKEN_SECRET; // Chave secreta no .env

/**
 * 
 * @param {NextRequest} req 
 * @returns {NextResponse}
 */
export function middleware(req) {
  // Excluir rotas específicas da autenticação
  const publicRoutes = ["/api/auth", "/ui/auth"];

  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next(); // Permite acesso sem autenticação
  }

  const useCookie = cookies();
  const authToken = req.headers.get("Authorization") || useCookie.get('auth-token')?.value;
 
  if (!authToken || !authToken.startsWith("Bearer ")) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 
    } else {
      return NextResponse.redirect(new URL("/ui/auth", req.url)); // Redireciona para login
    }
  }

  const token = authToken.split(" ")[1]; // Obtém o token após "Bearer"

  try {
    jwtVerify(token, new TextEncoder().encode(SECRET_KEY)); // Verifica o 
    return NextResponse.next(); // Permite o acesso à rota
  } catch (error) {
        if (req.nextUrl.pathname.startsWith('/api')) {
          return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
        } else {
          return NextResponse.redirect(new URL("/ui/auth", req.url)); // Redireciona para login
        }
  }
}

// Aplicando o middleware apenas em rotas protegidas
export const config = {
  matcher: ['/ui/:page*', '/api/:path*'],
};
