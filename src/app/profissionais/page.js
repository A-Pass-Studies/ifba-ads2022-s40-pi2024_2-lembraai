"use client";

import React, { useEffect, useState } from "react";
import "./profissionais.css";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/profissionais");
        const data = await response.json();
        setProfissionais(data);
      } catch (error) {
        console.error("Erro ao buscar os profissionais:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Profissionais Cadastrados</h1>
      <div className="container">
        {profissionais.length > 0 ? (
          profissionais.map((profissional) => (
            <div key={profissional.id} className="card">
              <h3>{profissional.nome}</h3>
              <p>Email: {profissional.email}</p>
              <p>Data de nascimento: {new Date(profissional.data_nascimento).toLocaleDateString()}</p>
              <p>Gênero: {profissional.genero}</p>
            </div>
          ))
        ) : (
          <p>Nenhum profissional cadastrado.</p>
        )}
      </div>
    </div>
  );
}
