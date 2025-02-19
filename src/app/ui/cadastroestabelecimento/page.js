import React from 'react';
import './style.css';
import { TextField } from '@mui/material';

const CadastroProfissional = () => {
  return (
    <div id="registroEstabelecimento">
      <div id="top-bar1">
        <div className="imgseta">
          <a href="/ui/login.html">
            <img src="/arrow-back-icon.svg" alt="arrow-back-icon" width="24" height="24" />
          </a>
        </div>
      </div>
      <from>
        <div className="container">
          <h1>Cadastro Estabelecimento</h1>
          <div className="logo-upload">
            <img src="/image (1).png" alt="Logomarca" />
            <button>Upload</button>
          </div>
          <div className="form-group">
            <label htmlFor="nome-fantasia">Nome Fantasia</label>
            <input type="text" id="nome-fantasia" name="nome-fantasia" />
          </div>
          <TextField id="razaoSocial" name="razaoSocial" variant="filled" fullWidth margin="normal"/>
          <TextField id="cnpj" label="CNPJ" variant="filled" fullWidth />
          <div className="form-group gender">
            <label>Atende:</label>
            <input type="checkbox" id="masculino" name="gender" value="masculino" />
            <label htmlFor="masculino">Masculino</label>
            <input type="checkbox" id="feminino" name="gender" value="feminino" />
            <label htmlFor="feminino">Feminino</label>
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone/Celular</label>
            <input type="text" id="telefone" name="telefone" placeholder="(99) 9 9999-9999" />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" name="cep" placeholder="00000-000" />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select id="estado" name="estado">
              <option value="">Selecione um estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input type="text" id="endereco" name="endereco" />
          </div>
          <div className="form-group">
            <label htmlFor="numero">Número</label>
            <input type="text" id="numero" name="numero" />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição breve</label>
            <textarea id="descricao" name="descricao"></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Salvar</button>
          </div>
        </div>
      </from>
    </div>
  );
};

export default CadastroProfissional;

