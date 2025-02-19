import React from 'react';
import './style.css';
import Link from 'next/link';

const Estabelecimento = () => {
  return (
    <div id="registroEstabelecimento">
      <div id="top-bar1">
        <div className="imgseta">
          <a href="/ui/login.html">
            <img src="/arrow-back-icon.svg" alt="arrow-back-icon" width="24" height="24" />
          </a>
        </div>
      </div>
      <h2 className="obs">Dados do estabelecimento</h2>
      <div className="caixaregistro">
        <h4>Cadastre um novo!</h4>
        <p>Opte por cadastrar um novo estabelecimento</p>
        <p>
          Ao cadastrar um novo estabelecimento, você se tornará o administrador do estabelecimento e poderá aceitar novos associados
        </p>
        <div className="opcoes">
          <Link href="/ui/cadastroestabelecimento">Cadastre um estabelecimento</Link>
        </div>
      </div>
      <div className="caixaregistro">
        <h4>Ou associe-se com um existente!</h4>
        <p>Opte por se tornar um funcionário/sócio</p>
        <p>
          Ao optar por associar-se com um estabelecimento existente, uma notificação será enviada para o administrador. Assim que ele
          o aceitar, você poderá receber novos pedidos
        </p>
        <br />
        <br />
        <div className="opcoes">
          <Link href="/ui/cadastroestabelecimento">Associe-se com um estabelecimento</Link>
        </div>
        <br />
        <p className="obs">Essas configurações poderão ser alteradas posteriormente na tela de configurações de perfil do usuário.</p>
      </div>
    </div>
  );
};

export default Estabelecimento;
