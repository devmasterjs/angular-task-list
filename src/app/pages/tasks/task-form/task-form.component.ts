import {
  Component,
  OnInit,
  AfterContentChecked,
  Optional,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = '';
  taskForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  isSubmittingForm: boolean = false;
  task: Task = new Task();
  categories: Array<Category>;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildTaskForm();
    this.loadTask();
    this.loadCategories();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.isSubmittingForm = true;
    console.log('CURRENT-ACTION:', this.currentAction);
    if (this.currentAction == 'new') {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildTaskForm() {
    this.taskForm = this.formBuilder.group({
      id: [null],
      listId: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  private loadTask() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.taskService.getById(Number(params.get('id')))
          )
        )
        .subscribe(
          (task) => {
            console.log('EDIT-TASK: ', task);
            this.task = task;
            this.taskForm.patchValue(this.task);
          },
          (error) => alert('ocorreu um erro no servidor, tente mais tarde!')
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Tarefa';
    } else {
      const taskName = this.task.title || '';
      this.pageTitle = `Editando Tarefa: ${taskName}`;
    }
  }

  private createTask() {
    const task: Task = Object.assign(new Task(), this.taskForm.value);
    this.taskService.create(task).subscribe(
      (task) => this.actionsForSucess(task),
      (error) => this.actionsForError(error)
    );
  }

  private updateTask() {
    const task: Task = Object.assign(new Task(), this.taskForm.value);
    console.log('TASK-FORM: ', this.taskForm.value);
    console.log('TASK: ', task);
    this.taskService.update(task).subscribe(
      (task) => this.actionsForSucess(task),
      (error) => this.actionsForError(error)
    );
  }

  private actionsForSucess(task: Task) {
    this.toastr.success('Solicitação processada com sucesso!');

    //redirect/reload
    this.router
      .navigateByUrl('tasks', { skipLocationChange: true })
      .then(() => this.router.navigate(['tasks', task.id, 'edit']));
  }

  private actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação');
    this.isSubmittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. Por favor teste mais tarde.',
      ];
    }
  }

  private loadCategories() {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }
}
