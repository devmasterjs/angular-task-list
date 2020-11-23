import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      (categories) => (this.categories = categories),
      (error) => console.log('erro ao carregar a lista', error)
    );
  }

  deleteCategory(category: Category): string {
    let message = 'Nenhuma categoria foi excluída!';
    const mustDelete = confirm('Deseja realmente exclulir este item?');
    if (mustDelete && category.id) {
      this.categoryService.delete(category.id).subscribe(() => {
        this.categories = this.categories.filter(
          (element) => element != category
        );
        message = `A categoria ${category.id} - ${category.title} foi removida com sucesso!`;
      });
    }
    return message;
  }
}
