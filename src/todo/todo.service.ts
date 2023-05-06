import { Body, Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Todo } from 'src/shared/types/todo.type';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}
  async create(createTodoDto: CreateTodoDto): Promise<Record<string, string>> {
    const { title, text } = createTodoDto;
    await this.knex('todo').insert({
      todo_title: title,
      todo_text: text,
    });

    return { message: 'succsess' };
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
