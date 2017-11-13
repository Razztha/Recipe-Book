import { Component, OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../recipe'
import {ShoppingListService} from '../../shopping-list/shopping-list.service'
import {Subscription} from 'rxjs/Rx';
import {RecipeService} from '../recipe.service';
 
@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe : Recipe; 
  private recipeIndex : number;
  private subscription  : Subscription;
constructor(private sls : ShoppingListService,private router : Router,private route: 
ActivatedRoute,private recipeService: RecipeService) {

 }
ngOnInit()
{
  this.subscription = this.route.params.subscribe((params:any)=>{
    this.recipeIndex = params['id'];
    this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
  });
}


onEdit()
{
  this.router.navigate(['/recipes',this.recipeIndex,'edit']);
}
onDelete()
{
  this.recipeService.deleteRecipe(this.selectedRecipe);
 this.router.navigate(['/recipes'])
}

  onAddToShoppingList()
  {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
