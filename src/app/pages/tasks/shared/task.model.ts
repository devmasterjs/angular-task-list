import { Category } from '../../categories/shared/category.model';

export class Task {
  constructor(
    public id?: number,
    public listId: number = 0,
    public title: string = 'Nova Tarefa'
  ) {}
}
