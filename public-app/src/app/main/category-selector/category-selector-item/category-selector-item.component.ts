import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category } from "src/app/model/category.model";
@Component({
  selector: 'app-category-selector-item',
  templateUrl: './category-selector-item.component.html',
  styleUrls: ['./category-selector-item.component.scss']
})
export class CategorySelectorItem {
  @Input() category: Category;
  @Input() selected: boolean;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();

  itemSelectedEvent(){
    this.itemSelected.emit();
  }

  get isExpandable(){
    return this.category.children && this.category.children.length != 0;
  }

  get isNewItem(){
    return this.category.id == 'new';
  }
}