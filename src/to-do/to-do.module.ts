import { Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './to-do.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
