import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent],
  imports: [CommonModule, TasksRoutingModule, ReactiveFormsModule],
})
export class TasksModule {}
