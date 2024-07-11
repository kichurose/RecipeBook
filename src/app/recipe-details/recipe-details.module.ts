import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details.ctrl';
import { RecipeService } from '../services/recipe.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [RecipeDetailsComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [RecipeDetailsComponent],
  providers: [RecipeService],
})
export class RecipeDetailsModule {}
