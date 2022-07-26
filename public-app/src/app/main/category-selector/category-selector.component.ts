import { Component, EventEmitter, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Category } from "src/app/model/category.model";
import { AppState } from "src/app/store";
import * as CategorySelectors from 'src/app/store/category/category.selectors';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelector {
  categoryList: Category[] = [];
  subs: Subscription[] = [];
  path: Category[] = [];
  selectedCategory: Category | null;

  @Output() pathChangedEvent: EventEmitter<Category[]> = new EventEmitter();
  @Output() categorySelectedEvent: EventEmitter<Category> = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    let sub = this.store.select(CategorySelectors.selectAll).subscribe(data => {
      this.categoryList = data;
      console.log(data);
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }

  pathChangedHandler(){
    if(this.path.length > 0){
      this.selectedCategory = this.path[this.path.length - 1];
      this.pathChangedEvent.emit([...this.path]);
      this.categorySelectedEvent.emit(this.selectedCategory);
    }
  }
}