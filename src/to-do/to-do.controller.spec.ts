import { Test, TestingModule } from '@nestjs/testing';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';
import { ToDo } from './to-do.entity';
import { NotFoundException } from '@nestjs/common';

describe('ToDoController', () => {
  let controller: ToDoController;
  let fakeToDoService: Partial<ToDoService>;

  beforeEach(async () => {
    fakeToDoService = {
      getAll: jest.fn().mockImplementation(() => Promise.resolve([{} as ToDo])),
      getOne: jest
        .fn()
        .mockImplementation((id: number) => Promise.resolve({ id } as ToDo)),
      create: jest.fn().mockImplementation((task: string, time: string) =>
        Promise.resolve({
          task,
          time,
        } as ToDo),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [ToDoService],
    })
      .overrideProvider(ToDoService)
      .useValue(fakeToDoService)
      .compile();

    controller = module.get<ToDoController>(ToDoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("returns all to do's", async () => {
    const toDos = await controller.getAllToDos();
    expect(toDos).toBeDefined();
  });

  it('throws an error if the typed id does not belong to a to do in the database', async () => {
    fakeToDoService.getOne = jest.fn().mockResolvedValue(undefined);
    await expect(controller.getOneToDo('1')).rejects.toThrow(NotFoundException);
  });

  it('returns the id with the id typed', async () => {
    const toDo = await controller.getOneToDo('1');
    expect(toDo).toEqual({ id: 1 });
    expect(fakeToDoService.getOne).toBeCalledWith(1);
  });

  it('create a to do', async () => {
    const toDo = await controller.createToDo({
      task: 'Frontend',
      time: '1 semana',
    });
    expect(toDo).toBeDefined();
    expect(toDo).toEqual({
      task: 'Frontend',
      time: '1 semana',
    });
    expect(fakeToDoService.create).toBeCalledWith('Frontend', '1 semana');
  });
});
