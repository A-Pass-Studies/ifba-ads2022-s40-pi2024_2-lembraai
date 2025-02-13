
import Image from "next/image";

import React from "react"


import styles from "./perfilcliente.module.css";

import Link from "next/link";



export default function perfilcliente() {
    return (

        
            <div className="perfil-container">
              <div className="top-bar">
                <Link href="/">
                  <img
                    src="arrow-back-icon.svg"
                    alt="Voltar"
                    width={48}
                    height={48}
                  />
                </Link>
              </div>
        
              <div className="Main">
                <h1>Perfil</h1>
        
                <div className="container">
                  <img
                    src="perfil-cliente.png"
                    alt="Foto de Perfil"
                    width={100}
                    height={100}
                    className="fotoPerfil"
                  />
                  <img
                    src="mudar-foto-perfil.png"
                    alt="Mudar Foto"
                    width={30}
                    height={30}
                    className="mudarFoto"
                  />
                </div>
        
                <h2>Nome do usuário</h2>
                <h3>exemplo@gmail.com</h3>
        
                <Link href="/detalhes-pessoais">
                  <img
                    src="opcao1perfil-cliente.png"
                    alt="Detalhes Pessoais"
                    width={200}
                    height={50}
                  />
                </Link>
        
                <Link href="/senha-cliente">
                  <img
                    src="opcao2perfil-cliente.png"
                    alt="Alterar Senha"
                    width={200}
                    height={50}
                  />
                </Link>
              </div>
        
              {/* Rodapé */}
              <div className="rodape">
                <Link href="/">
                  <img
                    src="Rodape1perfil-cliente.png"
                    alt="Rodapé 1"
                    width={50}
                    height={50}
                  />
                </Link>
                <img
                  src="Rodape2perfil-cliente.png"
                  alt="Rodapé 2"
                  width={50}
                  height={50}
                />
                <img
                  src="Rodape3perfil-cliente.png"
                  alt="Rodapé 3"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          );
        }
        


  