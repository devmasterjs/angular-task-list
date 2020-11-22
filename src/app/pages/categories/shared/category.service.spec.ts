import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { CategoryService } from './category.service';
import { Category } from './category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    inject(
      [CategoryService, HttpTestingController],
      (_service: CategoryService, _httpMock: HttpTestingController) => {
        service = _service;
        httpMock = _httpMock;
      }
    );
  });

  beforeEach(inject(
    [CategoryService, HttpTestingController],
    (_service: CategoryService, _httpMock: HttpTestingController) => {
      service = _service;
      httpMock = _httpMock;
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll: should return category list', () => {
    let categories: Array<Category> = [];
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
    const req = httpMock.expectOne('http://localhost:3000/lists');
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
    const testRequest = httpMock.expectOne('http://localhost:3000/lists');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });

  it('getById: should return category {id:1 title: "Mercado"}', () => {
    const mockCategory = new Category(1, 'Mercado');
    let category = new Category();

    service.getById(1).subscribe((result) => (category = result));

    const req = httpMock.expectOne('http://localhost:3000/lists/1');
    req.flush(mockCategory);
    httpMock.verify();

    expect(category).toBeInstanceOf(Category);
    expect(category.id).toBe(1);
    expect(category.title).toBe('Mercado');
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
    const testRequest = httpMock.expectOne('http://localhost:3000/lists/1');
    testRequest.flush(injectMockError.message, injectMockError.error);
    httpMock.verify();
    expect(service['handleError']).toHaveBeenCalledTimes(1);
  });
});
