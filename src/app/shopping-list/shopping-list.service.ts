import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientClickedForEdit = new Subject<number>();
  ingredients: Ingredient[] = [ new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10) ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ing: Ingredient[]) {
    this.ingredients.push(...ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }
  editIngredient(index: number, ing: Ingredient) {
    this.ingredients[index] = ing;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient( index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}


