import { Recipe } from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Simply a test'
      , 'http://cdn.jamieoliver.com/recipe-database/xtra_med/DPngvbxJ4oeAaNG92NeNcF.jpg'
      , [new Ingredient('Meat', 1), new Ingredient('FrenchFries', 20)]),
    new Recipe('A New Second Test Recipe',
      'Simply a Second test', 'http://cdn.jamieoliver.com/recipe-database/xtra_med/DPngvbxJ4oeAaNG92NeNcF.jpg'
      , [new Ingredient('Meat', 1), new Ingredient('Carrots', 5)])];

  getRecipes() {
      return this.recipes.slice();
    }
    getRecipe(index: number) {
     return this.recipes[index];
    }
   constructor(private shoppingListService: ShoppingListService) {}
    addIngredientsToShoppingList(ingts: Ingredient[]) {
     this.shoppingListService.addIngredients(ingts);
    }
    addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipes(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    }
    setRecipes(recipes: Recipe[]) {
     this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
