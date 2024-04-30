const ProgressBar = require('progress');
const knex = require('./knex');

const insertDB = async (data) => {
  // inicia a barra de progresso
  let bar = new ProgressBar(`Gravando dados: :current/:total (:percent) [:bar] :rate/bps :etas`, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: data.length
  });

  // insere cada item do array 'dados' no banco de dados
  await knex.transaction(async trx => {
    for (const obj of data) {
      try {
        await trx('chamadas').insert(obj)
          .then(() => {

            // incrementa a barra de progresso
            bar.tick();

            // caso contrário, encerra a inserção
            if (bar.complete) {
              console.log('Inserção completa');
              return
            }
          })
          .catch((err) => console.log(err));
      }
      catch (error) {
        throw new Error(error)
      }
    };
  });
};


module.exports = insertDB;