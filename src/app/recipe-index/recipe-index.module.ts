import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RecipeIndexComponent } from './recipe-index.ctrl';
import { RecipeService } from '../services/recipe.service';

@NgModule({
  declarations: [RecipeIndexComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [RecipeIndexComponent],
  providers: [RecipeService],
})
export class RecipeIndexModule {}
