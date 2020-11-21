import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a breadcrumb-item link 'Home'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.breadcrumb-item a').textContent).toContain(
      'Home'
    );
  });

  it(`should have a breadcrumb-item 'Categorias'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.breadcrumb-item:nth-child(2)').textContent
    ).toContain('Categorias');
  });

  it(`should render category title as 'Categorias'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div > div > h1.h2').textContent).toContain(
      'Categorias'
    );
  });

  it(`should have a table head column 'Categoria'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('th:nth-child(1)').textContent).toContain(
      'Categoria'
    );
  });

  it(`should have a table head column 'Ações'`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('th:nth-child(2)').textContent).toContain(
      'Ações'
    );
  });

  it(`should have a table with tbody`, () => {
    fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table tbody')).toBeTruthy();
  });
});
