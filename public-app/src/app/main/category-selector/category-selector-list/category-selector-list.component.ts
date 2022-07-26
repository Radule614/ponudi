import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category } from "src/app/model/category.model";
@Component({
  selector: 'app-category-selector-list',
  templateUrl: './category-selector-list.component.html',
  styleUrls: ['./category-selector-list.component.scss']
})
export class CategorySelectorList {
  @Input() categories: Category[] = [];
  @Input() depth: number = 0;
  @Input() path: Category[] = [];
  @Output() pathChanged: EventEmitter<any> = new EventEmitter();
  
  selectedCategory: Category | null = null;
  
  categorySelectedEvent(category: Category){
    if(this.selectedCategory != category){
      this.selectedCategory = category;
      for(let i = 0; i < this.path.length - this.depth; i++){
        this.path.pop()
      }
      this.path[this.depth] = category;
      this.pathChanged.emit();
    }
  }
}