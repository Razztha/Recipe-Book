import { Component} from '@angular/core';
import {RecipeService} from './recipes/recipe.service';
import {Response} from '@angular/http';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{

  constructor(private recipService : RecipeService) { }

 onStore()
 {
    this.recipService.storeRecipes().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
 }
 onFetch()
 {
  this.recipService.retriveRecipes();
 }
}
