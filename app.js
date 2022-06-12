// Incluindo biblioteca
const http = require('http'); 
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

// Definição de ip / url
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Implementação da regra de negócio
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true)
  // Receber informações do usuario
  const params = queryString.parse(urlparse.search);

  // Criar - atualizar usuario
  if(urlparse.pathname == '/criar-atualizar-usuario'){
    
    // Salvar informações 
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta  = 'Usuario criado com sucesso'

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
  });
  }
  // Selecionar usuario
  else if(urlparse.pathname == '/selecionar-usuario'){
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }
  // Remover usuario
  else if(urlparse.pathname == '/remover-usuario'){
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!');

      resposta = err ? "Usuario nao encontrado" : "Usuario removido";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta); 
    });
  }

});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// localhost:3000/criar-atualizar-usuario?nome=Chris&idade=24&id=1
// localhost:3000/selecionar-usuario?id=1
// localhost:3000/remover-usuario?id=1
