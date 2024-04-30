const cron = require('node-cron');
const knex = require('./services/knex');
const fetchData = require('./services/fetchDataAPI');
const date = require('./services/today');

console.log('Aguardando inicio da aplicação...');

const exec = () => {
  // console.log(knex.client.config);
  return knex.raw('SELECT 1+1 AS result')
    .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .then(() => {
      fetchData(0);
    })
    .catch((err) => {
      console.log('Falha ao conectar ao banco de dados', err);
      return
    });
}

// exec()
cron.schedule('00 21 * * *', () => { exec() });

