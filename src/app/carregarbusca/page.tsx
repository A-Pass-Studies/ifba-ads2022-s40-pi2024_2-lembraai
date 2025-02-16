import React from "react";
import "./carregarbusca.css";

export default function Home() {
  return (
    <div className="container">
      <input type="text" placeholder="serviço ou estabelecimentos..." className="search-bar" />
      <div className="list">
        {[
          { name: "Fogarel", address: "Avenida Europa, 450, Dinah Borges, Eunápolis-BA", image: "fogarel.png" },
        ].map((item, index) => (
          <div className="item" key={index}>
            <img src={`/${item.image}`} alt={item.name} className="icon" />
            <div>
              <h3>{item.name}</h3>
              <p>{item.address}</p>
            </div>
            <span className="stars">⭐⭐⭐⭐</span>
          </div>
        ))}
      </div>
      <nav className="bottom-nav">
        <span>🏠 Início</span>
        <span className="active">🔍 Procurar</span>
        <span>📅 Agendas</span>
      </nav>
    </div>
  );
}
