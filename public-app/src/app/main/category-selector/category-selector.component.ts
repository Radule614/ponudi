import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Category } from "src/app/model/category.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as CategorySelectors from 'src/app/store/category/category.selectors';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent extends UnsubscribeComponent implements OnInit{
  categoryList: Category[] = [];
  path: Category[] = [];
  selectedCategory: Category | null;

  @Output() pathChangedEvent: EventEmitter<Category[]> = new EventEmitter();
  @Output() categorySelectedEvent: EventEmitter<Category> = new EventEmitter();

  constructor(private store: Store<AppState>) { super() }

  ngOnInit(): void {
    this.addToSubs = this.store.select(CategorySelectors.selectAll).subscribe(data => {
      this.categoryList = data;
    });
  }

  pathChangedHandler(){
    if(this.path.length > 0){
      this.selectedCategory = this.path[this.path.length - 1];
      this.pathChangedEvent.emit([...this.path]);
      this.categorySelectedEvent.emit(this.selectedCategory);
    }
  }
}