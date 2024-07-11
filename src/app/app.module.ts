import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.ctrl';
import { RecipeDetailsModule } from './recipe-details/recipe-details.module';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.ctrl';
import { RecipeDialogModule } from './recipe-dialog/recipe-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecipeDetailsModule,
    RecipeDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
