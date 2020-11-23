import { Category } from '../../categories/shared/category.model';

export class Task {
  constructor(
    public id?: number,
    public categoryId?: number,
    public title: string = 'Nova Tarefa',
    public category?: Category
  ) {}
}
