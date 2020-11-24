import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  categories = new Map();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      (categories) => {
        categories.forEach((category) =>
          this.categories.set(category.id, category.title)
        );
      },
      (error) => console.log('erro ao carregar categorias', error)
    );

    this.taskService.getAll().subscribe(
      (tasks) => (this.tasks = tasks.sort((a, b) => b.id - a.id)),
      (error) => console.log('erro ao carregar a lista de tarefas', error)
    );
  }

  deleteTask(task: Task): string {
    let message = 'Nenhuma tarefa foi excluída!';
    const mustDelete = confirm('Deseja realmente exclulir este item?');
    if (mustDelete && task.id) {
      this.taskService.delete(task.id).subscribe(() => {
        this.tasks = this.tasks.filter((element) => element != task);
        message = `A tarefa ${task.id} - ${task.title} foi removida com sucesso!`;
      });
    }
    return message;
  }
}
