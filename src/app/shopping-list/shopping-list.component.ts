import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private shoppinglistservice: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getIngredients();
    this.subscription = this.shoppinglistservice.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  OnItemClick(index: number) {
    this.shoppinglistservice.ingredientClickedForEdit.next(index);
  }
}
