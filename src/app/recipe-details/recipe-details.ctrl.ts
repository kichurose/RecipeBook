import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.ctrl.html',
  styleUrls: ['./recipe-details.ctrl.scss'],
})
export class RecipeDetailsComponent {
  @Input()
  public recipeFormGroup!: FormGroup;
  public ingredientFormGroup: FormGroup;
  public item1: string = 'Item1';
  public item2: string = 'Item2';

  public ingredientsArray: string[] = [];

  public get name(): string {
    return this.recipeFormGroup.get('name')?.value;
  }

  public get instructions(): string {
    return this.recipeFormGroup.get('instructions')?.value;
  }

  public get ingredientName(): string {
    return this.ingredientFormGroup.get('ingredient')?.value;
  }

  // public get amount(): string {
  //   return this.ingredientFormGroup.get('amount')?.value;
  // }

  public get ingredients(): FormArray {
    return this.recipeFormGroup.get('ingredients') as FormArray;
  }

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder
  ) {
    this.ingredientFormGroup = this.formBuilder.group({
      ingredient: [''],
      //amount: [''],
    });
  }

  ngOnInit(): void {
    //this.ingredientFormGroup.patchValue({});
  }

  addIngredient(): void {
    const ingredientForm = this.formBuilder.group({
      ingredient: ['', Validators.required],
      //amount: [''],
    });

    this.ingredients.push(ingredientForm);
  }

  

  public onAddClick(): void {
    this.ingredients.controls.forEach((element) => {
      this.ingredientsArray.push(element.value['ingredient']);
    });

    const newRecipe: Recipe = {
      name: this.name,
      ingredients: this.ingredientsArray,
      instructions: this.instructions,
    };

    console.log(newRecipe);
    this.recipeService.addRecipe(newRecipe).subscribe(
      (response) => {
        console.log('Recipe added successfully:', response);
      },
      (error) => {
        console.error('Error adding recipe:', error);
      }
    );
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.ingredients.controls,
      event.previousIndex,
      event.currentIndex
    );
  }
}
