import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('user_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('user_name', 32).notNullable();
    table.string('user_username', 32).notNullable();
    table.string('user_password').notNullable();
    table
      .timestamp('user_created_at', { useTz: true })
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
