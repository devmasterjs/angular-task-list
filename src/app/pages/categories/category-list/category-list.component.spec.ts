import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { CategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [CategoryListComponent],
      providers: [CategoryService],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    component.categories = [
      {
        id: 1,
        title: 'Mercado',
      },
      {
        id: 2,
        title: 'Trabalho',
      },
      {
        id: 3,
        title: 'Acampamento',
      },
    ];
    categoryService = TestBed.inject(CategoryService);
  });

  it('CategoryListComponent: should create', () => {
    expect(component).toBeTruthy();
  });

  it(`CategoryListComponent: should have a breadcrumb-item link 'Home'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.breadcrumb-item a').textContent).toContain(
      'Home'
    );
  });

  it(`CategoryListComponent: should have a breadcrumb-item 'Categorias'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.breadcrumb-item:nth-child(2)').textContent
    ).toContain('Categorias');
  });

  it(`CategoryListComponent: should render category title as 'Categorias'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div > div > h1.h2').textContent).toContain(
      'Categorias'
    );
  });

  it(`CategoryListComponent: should have a table head column 'Categoria'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('th:nth-child(1)').textContent).toContain(
      'Categoria'
    );
  });

  it(`CategoryListComponent: should have a table head column 'Ações'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('th:nth-child(2)').textContent).toContain(
      'Ações'
    );
  });

  it(`CategoryListComponent: should have a table with tbody`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table tbody')).toBeTruthy();
  });

  it('CategoryListComponent: On init getAll() should be loaded', fakeAsync(() => {
    const category = new Category(1, 'Trabalho');
    spyOn(categoryService, 'getAll').and.returnValue(
      of([category]).pipe(delay(1))
    );
    fixture.detectChanges();
    expect(component.categories).toBeTruthy();
    expect(categoryService.getAll).toHaveBeenCalledWith();
    tick(1);
    expect(component.categories.length).toBe(1);
    expect(component.categories[0].id).toBe(category.id);
    expect(component.categories[0].title).toBe(category.title);
  }));

  it('CategoryListComponent: On init getAll() should be loaded with error', fakeAsync(() => {
    spyOn(categoryService, 'getAll').and.returnValue(
      throwError({ status: 404 })
    );
    fixture.detectChanges();
    tick(1);
    expect(component.categories).toBeTruthy();
    expect(categoryService.getAll).toHaveBeenCalledWith();
  }));

  it(`CategoryListComponent: should have delete a Category`, fakeAsync(() => {
    const category = new Category(3, 'Acampamento');
    const jsdomConfirm = window.confirm;
    window.confirm = () => {
      return true;
    };
    spyOn(categoryService, 'delete').and.returnValue(
      of(category.id).pipe(delay(1))
    );
    component.deleteCategory(category);
    tick(1);
    expect(component.categories).toBeTruthy();
    expect(categoryService.delete).toHaveBeenCalled();
    expect(component.deleteCategory).toHaveBeenCalled;
    window.confirm = jsdomConfirm;
  }));

  it(`CategoryListComponent: should have not delete a Category`, fakeAsync(() => {
    const category = new Category(3, 'Acampamento');
    const jsdomConfirm = window.confirm;
    window.confirm = () => {
      return false;
    };
    spyOn(categoryService, 'delete').and.returnValue(
      of(category.id).pipe(delay(1))
    );
    component.deleteCategory(category);
    tick(1);
    expect(component.categories).toBeTruthy();
    expect(categoryService.delete).toHaveBeenCalledTimes(0);
    expect(component.deleteCategory).toHaveBeenCalled;
    window.confirm = jsdomConfirm;
  }));
});
