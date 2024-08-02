import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Recipe {
    _id?: string;
    name: string;
    ingredients: string[];
    instructions: string;
  }
  
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
    private apiUrl = 'http://localhost:3000/recipes';

  constructor(private httpClient: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.apiUrl+`/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.apiUrl, recipe);
  }

  deleteRecipe(id: string){
    return this.httpClient.delete<Recipe>(this.apiUrl+`/${id}`);
  }
}
