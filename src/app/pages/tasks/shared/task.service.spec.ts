import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { TaskService } from './task.service';
import { Task } from './task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    inject(
      [TaskService, HttpTestingController],
      (_service: TaskService, _httpMock: HttpTestingController) => {
        service = _service;
        httpMock = _httpMock;
      }
    );
  });

  beforeEach(inject(
    [TaskService, HttpTestingController],
    (_service: TaskService, _httpMock: HttpTestingController) => {
      service = _service;
      httpMock = _httpMock;
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll: should return task list', () => {
    let categories: Array<Task> = [];
    const mockCategories = [
      {
        id: 1,
        title: 'Mercado',
      },
      {
        id: 2,
        title: 'Trabalho',
      },
    ];
    service.getAll().subscribe((list) => (categories = list));
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
    httpMock.verify();
    expect(categories.length).toEqual(2);
    expect(categories[0].id).toBe(1);
    expect(categories[0].title).toBe('Mercado');
    expect(categories[1].id).toBe(2);
    expect(categories[1].title).toBe('Trabalho');
  });

  it('getAll: should call handleError(error) and return HttpErrorResponse with status=404', () => {
    const injectMockError = {
      message: 'Invalid request parameters',
      error: { status: 404, statusText: 'Bad Request' },
    };

    spyOn<any>(service, 'handleError').and.callThrough();
    service.getAll().subscribe(
      () => {},
      (e) => {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toEqual(404);
      }
    );
    const testRequest = httpMock.expectOne('http://localhost:3000/tasks');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });

  it('getById: should return task {id:1, categoryId:1, title: "Comprar Feijão"}', () => {
    const mockCategory = new Task(1, 1, 'Comprar Feijão');
    let task = new Task();

    service.getById(1).subscribe((result) => (task = result));

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);
    httpMock.verify();

    expect(task).toBeInstanceOf(Task);
    expect(task.id).toBe(1);
    expect(task.categoryId).toBe(1);
    expect(task.title).toBe('Comprar Feijão');
  });

  it('getById: should call handleError(error) and return HttpErrorResponse with status=404', () => {
    const injectMockError = {
      message: 'Invalid request parameters',
      error: { status: 404, statusText: 'Bad Request' },
    };

    spyOn<any>(service, 'handleError').and.callThrough();
    service.getById(1).subscribe(
      () => {},
      (e) => {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toEqual(404);
      }
    );
    const testRequest = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });

  it('create: should create a task {id:3, categoryId: 1, title: "Comprar Arroz"}', () => {
    const mockCategory = new Task(3, 1, 'Comprar Arroz');
    let task = new Task();

    service.create(mockCategory).subscribe((result) => (task = result));

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(mockCategory);
    httpMock.verify();

    expect(task).toBeInstanceOf(Task);
    expect(task.id).toBe(3);
    expect(task.categoryId).toBe(1);
    expect(task.title).toBe('Comprar Arroz');
  });

  it('create: should call handleError(error) and return HttpErrorResponse with status=404', () => {
    const mockCategory = new Task(3, 1, 'Comprar Arroz');
    const injectMockError = {
      message: 'Invalid request parameters',
      error: { status: 404, statusText: 'Bad Request' },
    };

    spyOn<any>(service, 'handleError').and.callThrough();
    service.create(mockCategory).subscribe(
      () => {},
      (e) => {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toEqual(404);
      }
    );
    const testRequest = httpMock.expectOne('http://localhost:3000/tasks');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });

  it('update: should update a task {id:3, categoryId:1 title: "Comprar Arroz"}', () => {
    const mockCategory = new Task(3, 1, 'Comprar Arroz');
    let task = new Task();

    service.update(mockCategory).subscribe((result) => (task = result));

    const req = httpMock.expectOne('http://localhost:3000/tasks/3');
    expect(req.request.method).toBe('PUT');
    req.flush(mockCategory);
    httpMock.verify();

    expect(task).toBeInstanceOf(Task);
    expect(task.id).toBe(3);
    expect(task.categoryId).toBe(1);
    expect(task.title).toBe('Comprar Arroz');
  });

  it('update: should call handleError(error) and return HttpErrorResponse with status=404', () => {
    const mockCategory = new Task(3, 1, 'Comprar Arroz');
    const injectMockError = {
      message: 'Invalid request parameters',
      error: { status: 404, statusText: 'Bad Request' },
    };

    spyOn<any>(service, 'handleError').and.callThrough();
    service.update(mockCategory).subscribe(
      () => {},
      (e) => {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toEqual(404);
      }
    );
    const testRequest = httpMock.expectOne('http://localhost:3000/tasks/3');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });

  it('delete: should delte a task {id:3, categoryId:1 title: "Comprar Arroz"}', () => {
    const mockCategoryId = 3;
    const mockCategory = new Task(mockCategoryId, 1, 'Comprar Arroz');
    let task = new Task();
    service.delete(mockCategoryId).subscribe((result) => (task = result));
    const req = httpMock.expectOne('http://localhost:3000/tasks/3');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockCategory);
    httpMock.verify();
    expect(task).toBeNull;
  });

  it('delete: should call handleError(error) and return HttpErrorResponse with status=404', () => {
    const mockCategoryId = 3;
    const injectMockError = {
      message: 'Invalid request parameters',
      error: { status: 404, statusText: 'Bad Request' },
    };

    spyOn<any>(service, 'handleError').and.callThrough();
    service.delete(mockCategoryId).subscribe(
      () => {},
      (e) => {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toEqual(404);
      }
    );
    const testRequest = httpMock.expectOne('http://localhost:3000/tasks/3');
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });
});
