import { Test, TestingModule } from '@nestjs/testing';
import { ToDoService } from './to-do.service';
import { Repository } from 'typeorm';
import { ToDo } from './to-do.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ToDoService', () => {
  let service: ToDoService;
  let fakeToDoRepository: Partial<Repository<ToDo>>;

  beforeEach(async () => {
    fakeToDoRepository = {
      find: jest.fn().mockImplementation(() => Promise.resolve([])),
      findOne: jest.fn().mockImplementation(() => Promise.resolve()),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((toDo) => Promise.resolve({ id: 1, ...toDo })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToDoService,
        {
          provide: getRepositoryToken(ToDo),
          useValue: fakeToDoRepository,
        },
      ],
    }).compile();

    service = module.get<ToDoService>(ToDoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("returns all to do's", async () => {
    const toDos = await service.getAll();
    expect(toDos).toBeDefined();
  });

  it('return a todo by id', async () => {
    fakeToDoRepository.findOne = jest.fn().mockResolvedValue({ id: 1 } as ToDo);
    const toDos = await service.getOne(1);
    expect(toDos).toEqual({ id: 1 });
    expect(fakeToDoRepository.findOne).toBeCalledWith({
      where: { id: 1 },
    });
  });

  it('create a to do', async () => {
    const toDo = await service.create('Frontend', '1 semana');
    expect(toDo).toEqual({
      id: 1,
      task: 'Frontend',
      time: '1 semana',
    });
  });
});
