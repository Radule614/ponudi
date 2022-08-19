import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { AppState } from "src/app/store";
import * as CategorySelectors from 'src/app/store/category/category.selectors';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public readonly activeCategory$: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private categoryService: CategoryService, private store: Store<AppState>){}
 
  get activeCategoryPath$(){
    return combineLatest([this.activeCategory$, this.store.select(CategorySelectors.selectAll)]).pipe(map(([category_id, categories]) => {
      return this.categoryService.getCategoryPath(categories, category_id);
    }));
  }
}