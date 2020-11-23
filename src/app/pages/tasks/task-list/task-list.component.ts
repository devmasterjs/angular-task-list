import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe(
      (tasks) => (this.tasks = tasks),
      (error) => console.log('erro ao carregar a tarefa', error)
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
