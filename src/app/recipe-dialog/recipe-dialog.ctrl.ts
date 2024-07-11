import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { RecipeIndexComponent } from '../recipe-index/recipe-index.ctrl';

@Component({
  selector: 'recipe-dialog',
  templateUrl: './recipe-dialog.ctrl.html',
  styleUrls: ['./recipe-dialog.ctrl.scss'],
})
export class RecipeDialogComponent {
  private overlayRef!: OverlayRef;
  public formGroup: FormGroup;
  isPanelOpen = false;

  public recipes: string[] = [];
  public isAddItem: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private overlay: Overlay
  ) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      ingredients: this.formBuilder.array([]),
      instructions: [''],
    });
  }

  public onIngredientClick(id: string): void {
    this.recipeService.getRecipeById(id).subscribe((data) => {
      this.formGroup.get('name')?.setValue(data.name);
      this.formGroup.get('instructions')?.setValue(data.instructions);
      this.setIngredients(data.ingredients);
    });
  }

  public setIngredients(ingredients: string[]) {
    const ingredientFormArray = this.formGroup.get('ingredients') as FormArray;
    ingredientFormArray.clear();

    ingredients.forEach((ingredient) => {
      const ingredientForm = this.formBuilder.group({
        ingredient: [ingredient, Validators.required],
        //amount: [''],
      });

      ingredientFormArray.push(ingredientForm);
    });
  }

  togglePanel() {
    const overlayConfig = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'custom-overlay-panel',
    });
    this.overlayRef = overlayConfig;
    if (!this.isPanelOpen) {
      this.isPanelOpen = !this.isPanelOpen;
      const portal = new ComponentPortal(RecipeIndexComponent);
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.onItemClick.subscribe((data) => {
        this.onIngredientClick(data);
        this.overlayRef.dispose();
        this.isPanelOpen = !this.isPanelOpen;
      });
    } else {
      this.overlayRef.dispose();
      this.isPanelOpen = !this.isPanelOpen;
    }
  }

  public onAddClick() {
    this.formGroup.reset({
      name: '',
      ingredients: this.formBuilder.array(['']),
      instructions: '',
    });
    this.isAddItem = true;
  }
}
