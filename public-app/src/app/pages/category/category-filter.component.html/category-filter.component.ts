import { ViewportScroller } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AdditionalField } from "src/app/model/article.model";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFilterComponent implements OnInit {
  @Input() fields: AdditionalField[] = [];
  @Input() categoryId: string;
  @Output() filtersChangedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private viewPortScroller: ViewportScroller) { }
  ngOnInit(): void { }

  filterSubmitHandler(params: Object) {
    this.filtersChangedEvent.emit();
    this.router.navigate(['/category', this.categoryId], { queryParams: params });
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
  filterClearHandler() {
    this.filtersChangedEvent.emit();
    this.router.navigate(['/category', this.categoryId]);
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}