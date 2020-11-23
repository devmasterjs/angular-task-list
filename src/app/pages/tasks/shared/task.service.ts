import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiPath = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Task[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategories));
  }

  public getById(id: number): Observable<Task> {
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
    const url = `${this.apiPath}/${task.id}`;
    return this.http
      .put(url, Task)
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

  private jsonDataToCategories(jsonData: any[]): Task[] {
    const categories: Task[] = [];
    jsonData.forEach((item) => {
      categories.push(item as Task);
    });
    return categories;
  }

  private jsonDataToTask(jsonData: any): Task {
    return jsonData as Task;
  }
}
