import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  editMode = false;
  editIndex: number;
  constructor(private shoppinglistservice: ShoppingListService) { }
  onSubmit() {
    if (this.editMode === true) {
      const value = this.form.value;
      const ingredient = new Ingredient(value.name, value.amount);
      this.shoppinglistservice.editIngredient(this.editIndex, ingredient);
    } else {
      const value = this.form.value;
      const ingredient = new Ingredient(value.name, value.amount);
      this.shoppinglistservice.addIngredient(ingredient);
    }
    this.editMode = false;
    this.form.reset();
  }
  ngOnInit() {
    this.shoppinglistservice.ingredientClickedForEdit.subscribe((index: number) => {
      this.editMode = true;
      this.editIndex = index;
      const ing: Ingredient = this.shoppinglistservice.getIngredient(this.editIndex);
      this.form.setValue({
        'name': ing.name,
        'amount': ing.amount
      });
    });
  }
  onDelete() {
    this.shoppinglistservice.deleteIngredient(this.editIndex);
    this.form.reset();
    this.editMode = false;
  }
  onClear() {
    this.form.reset();
  }

}
