import { Task } from './task.model';

const taskSellBeen = new Task(1, 1, 'Comprar Feijão');
const taskNewTask = new Task(1, 2);

describe('Task Model', () => {
  it('Task: should be created', () => {
    expect(taskSellBeen).toBeTruthy();
    expect(taskNewTask).toBeTruthy();
  });

  it('Task: should be id=1 categoryId=1 and title="Comprar Feijão"', () => {
    expect(taskSellBeen.id).toBe(1);
    expect(taskSellBeen.listId).toBe(1);
    expect(taskSellBeen.title).toBe('Comprar Feijão');
  });

  it('Task: should be id=1 categoryId=2 and title="Nova Tarefa"', () => {
    expect(taskNewTask.id).toBe(1);
    expect(taskNewTask.listId).toBe(2);
    expect(taskNewTask.title).toBe('Nova Tarefa');
  });
});
