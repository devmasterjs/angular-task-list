import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath = 'http://localhost:3000/lists';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategories));
  }

  public handleError(error: any): Observable<any> {
    //console.log('ERRO NA REQUISIÇÃO =>', error);
    return throwError(error);
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach((item) => {
      console.log(item);
      categories.push(item as Category);
    });
    return categories;
  }
}
