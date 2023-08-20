import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './to-do.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(@InjectRepository(ToDo) private repo: Repository<ToDo>) {}

  getAll() {
    return this.repo.find();
  }

  getOne(id: number) {
    const toDo = this.repo.findOne({ where: { id } });

    if (!toDo) {
      return;
    }

    return toDo;
  }

  create(task: string, time: string) {
    const todo = this.repo.create({
      task,
      time,
    });

    return this.repo.save(todo);
  }
}
