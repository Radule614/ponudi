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
  @Input() creation: boolean = false;
  @Output() pathChanged: EventEmitter<any> = new EventEmitter();

  pathChangedHandler(){
    this.pathChanged.emit();
  }

  categorySelectedEvent(category: Category){
    if(this.path[this.depth] != category){
      let size = this.path.length;
      for(let i = 0; i < size - this.depth; i++){
        this.path.pop();
      }
      this.path[this.depth] = category;
      this.pathChanged.emit();
    }
  }
}