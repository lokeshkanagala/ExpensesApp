import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeservice: RecipeService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.recipes = this.recipeservice.getRecipes();
    this.subscription = this.recipeservice.recipesChanged.subscribe((recipes: Recipe[]) => this.recipes = recipes);
  }
OnNewRecipe() {
  this.router.navigate(['new'], {relativeTo: this.route})
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
