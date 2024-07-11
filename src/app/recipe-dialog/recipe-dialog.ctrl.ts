import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'recipe-dialog',
  templateUrl: './recipe-dialog.ctrl.html',
  styleUrls: ['./recipe-dialog.ctrl.scss'],
})
export class RecipeDialogComponent {
  public formGroup: FormGroup;
  isPanelOpen = false;
  public recipeDict: Map<string, string> = new Map<string, string>();
  public recipes: string[] = [];
  public isAddItem: boolean = false;
  recipeArray: string[][] =[];


  constructor(private recipeService: RecipeService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      ingredients: this.formBuilder.array([]),
      instructions: [''],
    });
  }

  public ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((x: Recipe[]) => {
      this.recipeDict = new Map();
      x.forEach((recipe) => {
        if (recipe && recipe._id && recipe.name) {
          this.recipeDict.set(recipe._id, recipe.name);
          //console.log(this.recipeDict)
        }
      });
      //this.recipeDict.set((x)=> x.id,(x)=> x.name)

        this.recipeArray = Array.from(this.recipeDict.entries());
        //console.log(this.recipeDict)
    });

    
  }

  public onIngredientClick(id: string): void
  {
    this.recipeService.getRecipeById(id).subscribe(data => {
      this.formGroup.get('name')?.setValue(data.name);
      this.formGroup.get('instructions')?.setValue(data.instructions);
      //this.formGroup.get('ingredients')?.setValue(data.ingredients);
    });
    
  }
  
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  public onAddClick() {
this.isAddItem = true;
  }
}
