import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../categories/shared/category.service';
import { TaskService } from '../../tasks/shared/task.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  countTasks: number = 0;
  countCategories: number = 0;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
  }

  private loadTasks() {
    this.taskService
      .getAll()
      .subscribe((tasks) => (this.countTasks = tasks.length));
  }

  private loadCategories() {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.countCategories = categories.length));
  }
}
