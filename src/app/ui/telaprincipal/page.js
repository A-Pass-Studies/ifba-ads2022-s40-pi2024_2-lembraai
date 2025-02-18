"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Top Bar */}
      <div id="top-bar2">
        <Link href="./auth">
          <img src="/arrow-back-icon.svg" alt="Voltar para login" width={48} height={48} />
        </Link>

        <div className="itenstopbar">
          <img src="/bell-icon.svg" alt="Notificações" width={48} height={48} />

          <Link href="./perfilcliente">
            <img src="/account-circle.svg" alt="Perfil do Cliente" width={48} height={48} />
          </Link>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div id="index-content">
        {/* Carrossel */}
        <div className="carrousel">
          <img src="/masculino.png" alt="Estilo Masculino" />
          <img src="/feminino.png" alt="Estilo Feminino" />
        </div>

        {/* Mais Populares */}
        <div id="populares">
          <p>Mais populares</p>
          <img src="/https://placehold.co/316x205" alt="Imagem de exemplo" />
        </div>

        {/* Lojas */}
        <div className="lojas">
          {/* <div className="botoes">
            <button>Todos</button>
            <button>Populares</button>
          </div> */}
          <div className="loja">
            <img src="/fogarel.png" alt="Fogarel" />
            <Link href="/">Fogarel</Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="rodape">
                <Link href="./telaprincipal">
                  <img
                    src="/Rodape1perfil-cliente.png"
                    alt="Rodapé 1"
                    className="imgrodape"
                  />
                </Link>

                <Link href="./carregarbusca">
                <img
                  src="/Rodape2perfil-cliente.png"
                  alt="Rodapé 2"
                />
                </Link>

                <Link href="./telaagendamento">
                <img
                  src="/Rodape3perfil-cliente.png"
                  alt="Rodapé 3"
                />
                </Link>                
              </div>      
      
    </div>
  );
}
