const axios = require('axios');
const ProgressBar = require('progress');

const knex = require('knex')({
  client: 'mssql',
  connection: {
    host: '192.168.0.200\\sqlserverfull',
    port: 1434,
    user: 'dbAdmin',
    password: 'Ctelecom2017',
    database: 'API_Tentec',
  }
});

knex.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  })
  .catch((err) => {
    console.log('Falha ao conectar ao banco de dados', err);
    return
  });

function fetchData(registros_inicio) {
  const data = {
    autenticacao: {
      usuario: '47012641',
      senha: '@47012641#'
    },
    acao: 'cdr_detalhes',
    data_inicio: '11/04/2024 08:00:00',
    data_fim: '11/04/2024 19:00:00',
    conta_voip: '170.84.19.41',
    cliente_id: '',
    numero_destino: '',
    nomeDisplay: '',
    registros: '1000',
    registros_inicio: registros_inicio.toString()
  };

  axios.post('http://35.199.111.118/painel/api.php/cdr_detalhes', data)
    .then(function (response) {
      // inicia a barra de progresso
      let bar = new ProgressBar(':bar', { total: response.data.dados.length });

      // insere cada item do array 'dados' no banco de dados
      response.data.dados.forEach(item => {
        knex('discagem').insert(item)
          .then(() => {
            // incrementa a barra de progresso
            bar.tick();
            if (bar.complete) {
              console.log('\nInserção completa');
            }
          })
          .catch((err) => console.log(err));
      });

      // verifica se ainda há mais páginas para buscar
      if (registros_inicio + response.data.dados.length < response.data.qtd_total_resultados) {
        fetchData(registros_inicio + response.data.dados.length);
      } else {
        return
      }
    })
    .catch(function (error) {
      console.log(error);
      return
    });
}

fetchData(0);
