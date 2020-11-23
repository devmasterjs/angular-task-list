import { Category } from '../../categories/shared/category.model';

export class Task {
  [x: string]: any;
  task: any;
  constructor(
    public id?: number,
    public listId?: number,
    public title: string = 'Nova Tarefa',
    public category?: Category
  ) {}
}
