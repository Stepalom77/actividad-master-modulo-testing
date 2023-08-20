import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ToDoService } from './to-do.service';

@Controller('to-do')
export class ToDoController {
  constructor(private toDoService: ToDoService) {}

  @Get()
  getAllToDos() {
    return this.toDoService.getAll();
  }

  @Get('/:id')
  async getOneToDo(@Param('id') id: string) {
    const toDo = await this.toDoService.getOne(parseInt(id));
    if (!toDo) {
      throw new NotFoundException('The to do does not exists.');
    }

    return toDo;
  }

  @Post()
  async createToDo(@Body() body: any) {
    const toDo = await this.toDoService.create(body.task, body.time);
    return toDo;
  }
}
