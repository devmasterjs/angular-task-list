import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { CategoryService } from './category.service';
import { Category } from './category.model';

// const mockCategories = JSON.stringify([
//   new Category(1, 'Mercado'),
//   new Category(2, 'Trabalho'),
//   new Category(3),
// ]);

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
    service.getAll().subscribe((categories) => {
      expect(categories).toBeInstanceOf(Category);
      expect(categories.length).toEqual(3);
      console.log(categories);
    });
    const req = httpMock.expectOne('http://localhost:3000/lists');
    req.flush(mockCategories);
    httpMock.verify();
  });

  // it('getAll: should return error', () => {
  //   service.getAll().subscribe((categories) => {
  //     expect(categories).toBeInstanceOf(Category);
  //     expect(categories.length).toBe(3);
  //   });
  //   const req = httpMock.expectOne('http://localhost:3000/lists');
  //   req.flush(mockCategories);
  //   httpMock.verify();
  // });

  it('getAll: should call handleError(error) and return HttpErrorResponse with status=404', () => {
    const injectError = {
      message: 'Invalid request parameters',
      error: { status: 404, statusText: 'Bad Request' },
    };

    spyOn(service, 'handleError').and.callThrough();
    service.getAll().subscribe(
      () => {},
      (e) => {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toEqual(404);
      }
    );
    const testRequest = httpMock.expectOne('http://localhost:3000/lists');
    testRequest.flush(injectError.message, injectError.error);
    httpMock.verify();
    expect(service.handleError).toHaveBeenCalledTimes(1);
  });
});
