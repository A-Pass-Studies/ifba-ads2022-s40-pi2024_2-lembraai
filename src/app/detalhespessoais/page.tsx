"use client"
import { useState } from 'react';

import React from "react";

import styles from './detalhespessoais.module.css';

function EditarDetalhesPessoais() {
    const handleSaveClick = () => {
        window.location.href = 'PerfilCliente.html';
    };

    return (
        <div className={styles.Main}>
            <h1>EDITAR DETALHES PESSOAIS</h1>
            <div className="alteracoes">
                <input
                    type="text"
                    placeholder="Nome Completo"
                    {styles.input-texto}
                    required />
                <input
                    type="email"
                    placeholder="E-mail"
                    {styles.input-email}
                    required />
                <input
                    type="datetime-local"
                    placeholder="Data de Nascimento"
                    {styles.input-data}
                    required />
            </div>

            <div className={styles.opcoes}>
                <input type="radio" name="opcao" value="masculino" /> Masculino
                <input type="radio" name="opcao" value="feminino" /> Feminino
            </div>

            <div className={styles.botoes}>
                <button type="button" onClick={handleSaveClick}>
                    <img src="./resources/Salvar.png" alt="Salvar" className="botao" />
                </button>
                <button type="button">
                    <a href={styles.PerfilCliente.html}>
                        <img src="./resources/Cancelar.png" alt="Cancelar" className="botao" />
                    </a>
                </button>
            </div>
        </div>
    );
}

export default EditarDetalhesPessoais;

