import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/category.model";
import { CategoryService } from "src/app/services/category.service";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: 'breadcrumbs.component.html',
  styleUrls: ['breadcrumbs.component.scss']  
})
export class BreadcrumbsComponent extends UnsubscribeComponent implements OnInit {
  path: Category[];

  constructor(private categoryService: CategoryService) { super() }

  ngOnInit(): void {
    this.addToSubs = this.categoryService.getCurrentCategoryPath().subscribe(path => { this.path = path });
  }
}