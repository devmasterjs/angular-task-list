import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task } from './task.model';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiPath = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Task[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToTasks));
  }

  public getById(id: number): Observable<Task> {
    console.log('SERVICE-TASK-GET-BY-ID', id);
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToTask));
  }

  public create(task: Task): Observable<Task> {
    return this.http
      .post(this.apiPath, task)
      .pipe(catchError(this.handleError), map(this.jsonDataToTask));
  }

  public update(task: Task): Observable<Task> {
    console.log('SERVICE-TASK-UPDATE', task);
    const url = `${this.apiPath}/${task.id}`;
    return this.http
      .put(url, task)
      .pipe(catchError(this.handleError), map(this.jsonDataToTask));
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private handleError(error: any): Observable<any> {
    //console.log('ERRO NA REQUISIÇÃO =>', error);
    return throwError(error);
  }

  private jsonDataToTasks(jsonData: any[]): Task[] {
    const tasks: Task[] = [];
    jsonData.forEach((item) => {
      const task = Object.assign(new Task(), item);
      tasks.push(task);
    });
    return tasks;
  }

  private jsonDataToTask(jsonData: any): Task {
    return Object.assign(new Task(), jsonData);
  }
}
