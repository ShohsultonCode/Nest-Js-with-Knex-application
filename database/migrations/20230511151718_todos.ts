import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('todos', (table) => {
    table.uuid('todo_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('todo_title', 32).notNullable();
    table.string('todo_text', 2048).notNullable();
    table
      .enum('todo_status', ['progress', 'success', 'fail'])
      .notNullable()
      .defaultTo('progress');
    table
      .timestamp('todo_created_at', { useTz: true })
      .defaultTo(knex.fn.now());
    table
      .uuid('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todo');
}
