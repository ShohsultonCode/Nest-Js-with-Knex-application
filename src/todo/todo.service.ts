import { Inject, Injectable, Req } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}
  async create(
    createTodoDto: CreateTodoDto,
    req,
  ): Promise<Record<string, string>> {
    const { title, text } = createTodoDto;

    await this.knex('todos').insert({
      todo_title: title.toLocaleLowerCase(),
      todo_text: text.toLocaleLowerCase(),
      user_id: `${req.user.userId}`,
    });

    return { message: 'succsess' };
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }
  //s/sss

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
