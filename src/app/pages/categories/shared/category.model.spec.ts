import { Category } from './category.model';

const categoryWork = new Category(1, 'Trabalho');
const categoryNewCategory = new Category(2);

describe('Category Model', () => {
  it('Categorry: should be created', () => {
    expect(categoryWork).toBeTruthy();
    expect(categoryNewCategory).toBeTruthy();
  });

  it('Category: should be id=1 and title="Trabalho"', () => {
    expect(categoryWork.id).toBe(1);
    expect(categoryWork.title).toBe('Trabalho');
  });

  it('Category: should be id=2 and title="Nova Categoria"', () => {
    expect(categoryNewCategory.id).toBe(2);
    expect(categoryNewCategory.title).toBe('Nova Categoria');
  });
});
