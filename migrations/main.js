exports.up = (knex) =>
  knex.schema.createTable('chamadas', (table) => {
    table.increments('id').primary();
    table.string('origem');
    table.string('destino');
    table.string('contaCobranca');
    table.string('datahora');
    table.string('regiao');
    table.string('duracao');
    table.string('preco');
    table.string('sipcode');
    table.string('nomeDisplay');
    table.string('callID');
    table.string('motivodesligamento');
    table.string('CIF');
    table.string('tipochamada');
    table.string('IPorigemBye');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('chamadas');