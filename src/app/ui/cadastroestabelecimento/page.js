import React from 'react';
import './style.css';
import { Box, Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel, InputLabel, Select, MenuItem, TextField, Container, Typography } from '@mui/material';
import NavHeader from '@/components/NavHeader';
import UploadProfileImage from '@/components/UploadProfileImage';

const CadastroProfissional = () => {
  return (
    <Box>
      <NavHeader />
      <Container maxWidth="lg">
        <Typography variant="h5" component="h1" marginBottom="48px">Cadastro Estabelecimento</Typography>
        <form>
          <center><UploadProfileImage/></center>
          <TextField name="nomeFantasia" label="Nome Fantasia" variant="filled" required="required" margin="normal" fullWidth/>
          <TextField name="razaoSocial" label="Razão Social" variant="filled" fullWidth margin="normal" />
          <TextField id="cnpj" label="CNPJ" variant="filled" fullWidth margin="normal" />
          <FormControl component="fieldset" variant="standard" >
            <FormLabel component="legend">Atende:</FormLabel>
              <FormGroup sx={{ display: 'inline-block' }}>
                <FormControlLabel
                control={
                  <Checkbox name="atendeMasculino" />
                }
                label="Masculino"
              />
              <FormControlLabel
              control={
                <Checkbox name="atendeFeminino" />
              }
              label="Femino"
            />
            </FormGroup>
          </FormControl>
          <TextField name="telefoneOuCelular" label="Telefone/Celular" placeholder="(99) 9 9999-9999" variant="filled" fullWidth margin="normal"/>
          <TextField name="enderecoCep" label="CEP" placeholder="99999-999" variant="filled" fullWidth margin="normal"/>
          <FormControl fullWidth margin="normal">
            <InputLabel id="uf">UF</InputLabel>
            <Select labelId="uf" label="UF" name="enderecoEstado">
              <MenuItem value="">Selecione um estado</MenuItem>
              <MenuItem value="AC">Acre</MenuItem>
              <MenuItem value="AL">Alagoas</MenuItem>
              <MenuItem value="AP">Amapá</MenuItem>
              <MenuItem value="AM">Amazonas</MenuItem>
              <MenuItem value="BA">Bahia</MenuItem>
              <MenuItem value="CE">Ceará</MenuItem>
              <MenuItem value="DF">Distrito Federal</MenuItem>
              <MenuItem value="ES">Espírito Santo</MenuItem>
              <MenuItem value="GO">Goiás</MenuItem>
              <MenuItem value="MA">Maranhão</MenuItem>
              <MenuItem value="MT">Mato Grosso</MenuItem>
              <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
              <MenuItem value="MG">Minas Gerais</MenuItem>
              <MenuItem value="PA">Pará</MenuItem>
              <MenuItem value="PB">Paraíba</MenuItem>
              <MenuItem value="PR">Paraná</MenuItem>
              <MenuItem value="PE">Pernambuco</MenuItem>
              <MenuItem value="PI">Piauí</MenuItem>
              <MenuItem value="RJ">Rio de Janeiro</MenuItem>
              <MenuItem value="RN">Rio Grande do Norte</MenuItem>
              <MenuItem value="RS">Rio Grande do Sul</MenuItem>
              <MenuItem value="RO">Rondônia</MenuItem>
              <MenuItem value="RR">Roraima</MenuItem>
              <MenuItem value="SC">Santa Catarina</MenuItem>
              <MenuItem value="SP">São Paulo</MenuItem>
              <MenuItem value="SE">Sergipe</MenuItem>
              <MenuItem value="TO">Tocantins</MenuItem>
            </Select>
          </FormControl>
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
        </form>
      </Container>
    </Box>
  );
};

export default CadastroProfissional;

