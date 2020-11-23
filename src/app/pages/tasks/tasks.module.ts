import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { CategoryService } from '../categories/shared/category.service';

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, TasksRoutingModule, ReactiveFormsModule],
})
export class TasksModule {}
