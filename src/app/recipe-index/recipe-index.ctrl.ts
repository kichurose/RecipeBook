import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-index',
  templateUrl: './recipe-index.ctrl.html',
  styleUrls: ['./recipe-index.ctrl.scss'],
})
export class RecipeIndexComponent {
  @Output()
  public onItemClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onCloseClick: EventEmitter<void> = new EventEmitter<void>();
  recipeArray: string[][] = [];
  public recipeDict: Map<string, string> = new Map<string, string>();
  constructor(private recipeService: RecipeService) {}
  public ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((x: Recipe[]) => {
      this.recipeDict = new Map();
      x.forEach((recipe) => {
        if (recipe && recipe._id && recipe.name) {
          this.recipeDict.set(recipe._id, recipe.name);
        }
      });

      this.recipeArray = Array.from(this.recipeDict.entries());
    });
  }

  public onIngredientClick(id: string): void {
    this.onItemClick.emit(id);
  }

  public onCloseClicked(): void {
    this.onCloseClick.emit();
  }
  public onDeleteClicked(id: string, index: number) : void {
    this.recipeService.deleteRecipe(id)
    .subscribe(
      response => {
        this.recipeArray.splice(index, 1);

        console.log('Recipe deleted successfully', response);
      },
      error => {
        console.error('Error deleting recipe', error);
      }
    );
  }
}
