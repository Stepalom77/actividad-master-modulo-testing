import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  task: string;

  @Column()
  time: string;
}
