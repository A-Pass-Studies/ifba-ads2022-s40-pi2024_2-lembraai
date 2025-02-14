"use client"

import { useState } from 'react';
import styles from './senhacliente.module.css';

export default function senhacliente() {

    const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSenha === repetirSenha) {
      window.location.href = './perfilcliente';
    } else {
      alert('As senhas não coincidem!');
    }
};


  return (
    <div className={styles.body}>

<div className={styles.Main}>
      <h1 className={styles.texto}>ALTERAR SENHA</h1>
      <div className={styles.alteracoes}>


        <input
          type="password"
          placeholder="Senha Atual"
          className={styles.senhaatual}
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />
        
        
        
        <input
          type="password"
          placeholder="Nova Senha"
          className={styles.novasenha}
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repetir Nova Senha"
          className={styles.repetirsenha}
          value={repetirSenha}
          onChange={(e) => setRepetirSenha(e.target.value)}
        />
      </div>

      <div className={styles.botoes}>
        <button type="submit" onClick={handleSubmit}>

        <img
                    src="Salvar.png"
                    alt="Alterar Senha"
                    width={92}
                    height={80}
                  />        
                  
        </button>

        <button>
          <a href="/Perfilcliente">

          <img
                    src="Cancelar.png"
                    alt="Alterar Senha"
                    width={100}
                    height={50}
                  />                  </a>
        </button>
      </div>
    </div>


    </div>
    
  );
}
