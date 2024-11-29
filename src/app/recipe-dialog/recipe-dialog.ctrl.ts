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
    // Define a position strategy for a fixed side panel
    const positionStrategy = this.overlay.position()
      .global()
      .right('0') // Align to the right edge
      .top('0'); // Align to the top edge

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'custom-overlay-panel',
      positionStrategy,
      width: '300px', // Optional: Set a fixed width
      height: '100vh', // Optional: Full height
    });

  // Immediately trigger the sliding animation by setting the right property
  const panel = document.querySelector('.custom-overlay-panel') as HTMLElement; // Cast to HTMLElement
  if (panel) {
    panel.style.right = '0';  // Slide in immediately
  }
    
      this.isPanelOpen = !this.isPanelOpen;
      const portal = new ComponentPortal(RecipeIndexComponent);
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.onItemClick.subscribe((data) => {
        this.onIngredientClick(data);
        this.overlayRef.detach();
        this.overlayRef.dispose();
      });
      componentRef.instance.onCloseClick.subscribe(() => {
        this.overlayRef.detach();
        this.overlayRef.dispose();
      });

      this.overlayRef.backdropClick().subscribe(() => {
        this.overlayRef.detach();
        this.overlayRef.dispose();
      });
    
  }

  public onAddClick() {
    let ingredients = this.formGroup.get('ingredients') as FormArray;
    ingredients.clear();
    this.formGroup.reset({
      name: '',
      ingredients: this.formBuilder.array([]),
      instructions: '',
    });
  }
}
