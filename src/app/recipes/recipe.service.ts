import { Injectable, EventEmitter} from '@angular/core';
import {Recipe} from './recipe'
import {Ingredient} from '../ingredient';
import {Http,Response,Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
    recipeChanged = new EventEmitter<Recipe[]>();

 private recipes : Recipe[]=[ new Recipe('Eggos','Eggs and Chicken Crispy','http://jonvilma.com/images/meal-3.jpg'
 ,[new Ingredient('French Fries',2), new Ingredient('Pork Meat',3)]),
  new Recipe('Chips','Potato Chips Chillies','https://files.taxfoundation.org/20170110161620/meal2.jpg',
  [new Ingredient('Potatoes',5), new Ingredient('Chillies',6)]
  )
  ];

   constructor(private http : Http) { }
  getRecipes()
  {
    return this.recipes;
  }
  getRecipe(id : number)
  {
    return this.recipes[id];
  }
  deleteRecipe(recipe : Recipe)
  {
      this.recipes.splice(this.recipes.indexOf(recipe,1))
  }
  addRecipe(newRecipe : Recipe)
  {
      this.recipes.push(newRecipe);
  }
  editRecipe(oldRecipe : Recipe,newRecipe : Recipe)
  {
      this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }
  storeRecipes()
  {
        const body = JSON.stringify(this.recipes);
        const header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.put('https://recipebook-44fe6.firebaseio.com/recipes.json',body,
        {headers : header}
        )
  }
  retriveRecipes()
  {
    return this.http.get('https://recipebook-44fe6.firebaseio.com/recipes.json')
    .map((response : Response) => response.json())
    .subscribe((data : Recipe[]) =>{ 
        this.recipes = data;
        this.recipeChanged.emit(this.recipes);
    
})
    ;
  }
 
}
