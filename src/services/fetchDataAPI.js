const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const date = require('./today');
const insertDB = require('./insertDB');

const fetchData = async (registros_inicio, allData = []) => {

  console.log('Extraindo dados de ' + date());

  const data = {
    autenticacao: {
      usuario: process.env.TENTEC_USER,
      senha: process.env.TENTEC_PWD
    },
    acao: 'cdr_detalhes',
    conta_voip: '',
    data_inicio: date() + ' 08:00:00',
    data_fim: date() + ' 21:00:00',
    cliente_id: '',
    numero_destino: '',
    nomeDisplay: '',
    registros: '3000',
    registros_inicio: registros_inicio.toString()
  };

  const response = await axios.post('http://35.199.111.118/painel/api.php/cdr_detalhes', data);

  let totalRegistros = response.data.qtd_total_resultados;

  if (totalRegistros <= 0) {
    console.log('Nenhum dado encontrado!');
    console.log('Reiniciando aplicação...');
    console.log('\n===========================\n');
    return;
  };

  // Adiciona os dados da resposta ao array
  allData = allData.concat(response.data.dados);

  // Verifica se existem mais dados para buscar
  if (response.data.qtd_total_resultados > allData.length) {
    // Recursivamente busca os próximos dados
    return fetchData(registros_inicio + Number(data.registros), allData);
  } else {
    // Retorna os dados quando não há mais dados para buscar
    console.log('Dados encontrados => ' + allData.length);
    await insertDB(allData);
    console.log('Aguardando inicio da aplicação...');
    return
  }

}

module.exports = fetchData;