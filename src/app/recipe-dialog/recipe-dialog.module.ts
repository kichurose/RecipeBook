import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RecipeDialogComponent } from './recipe-dialog.ctrl';
import { RecipeDetailsModule } from '../recipe-details/recipe-details.module';

@NgModule({
  declarations: [RecipeDialogComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RecipeDetailsModule
  ],
  exports: [RecipeDialogComponent],
  providers: [RecipeService],
})
export class RecipeDialogModule {}
