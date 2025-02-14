"use client";

import React, { useState } from "react";

export default function BuscaProfissional() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      {/* Top Bar */}
      <div className="w-full flex justify-start items-center py-2">
        <img src="arrow-back-icon.svg" alt="Voltar" width="24" height="24" />
      </div>

      <h2 className="text-xl font-semibold mt-4">Cadastro Profissional</h2>

      {/* Barra de Pesquisa */}
      <div className="flex items-center border rounded-lg px-3 py-2 mt-4 bg-white shadow">
        <input
          type="text"
          name="pesquisaProfissional"
          className="search-input outline-none px-2"
          placeholder="Pesquisa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src="Icon (1).png" alt="Buscar" width="24" height="24" className="ml-2 cursor-pointer" />
        {search && (
          <img
            src="Icon.png"
            alt="Cancelar"
            width="24"
            height="24"
            className="ml-2 cursor-pointer"
            onClick={() => setSearch("")}
          />
        )}
      </div>

      {/* Card Profissional */}
      <div className="card flex items-center bg-white p-4 mt-6 rounded-lg shadow-md w-full max-w-md">
        <div className="w-16 h-16">
          <img src="fogarel.png" alt="Logo" className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold">Fogarel</h3>
          <p className="text-sm text-gray-600">Presencial • $$ • 1.2 miles away</p>
          <p className="text-sm text-blue-500">Entre para saber mais.</p>
        </div>
        <div className="rating text-yellow-500 text-xl">★★★</div>
      </div>
    </div>
  );
}
