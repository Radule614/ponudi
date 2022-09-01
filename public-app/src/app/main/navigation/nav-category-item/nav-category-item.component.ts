import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Category } from "src/app/model/category.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { NavigationService } from "../navigation.service";

@Component({
  selector: 'app-nav-category-item',
  templateUrl: './nav-category-item.component.html',
  styleUrls: ['../shared-styles.scss', './nav-category-item.component.scss'],
  animations: [
    trigger('expandBlock', [
      transition(':enter', [
        style({ height: 0}),
        animate('250ms ease-out', style({ height: '*' }))
      ]),
      transition(':leave', [
        style({ height: '*'}),
        animate('250ms ease-out', style({ height: 0 }))
      ])
    ]),
    trigger('expandButton', [
      state('true',   style({ transform: 'rotateZ(-90deg)' })),
      state('false',  style({ transform: 'rotateZ(0deg)' })),
      transition('true <=> false', animate('250ms ease-out'))
    ])
  ]
})
export class NavCategoryItemComponent extends UnsubscribeComponent implements OnInit {
  @Input() category: Category;
  @Input() mainNav: boolean;
  @Input() depth: number = 0;

  expanded: boolean | null = false;

  constructor(private navigationService: NavigationService, private changeDetector: ChangeDetectorRef) { super() }
  ngOnInit(): void {
    this.addToSubs = this.navigationService.activeCategoryPath$.subscribe(path => {
      if(path[this.depth] && this.category && !this.expanded){
        this.expanded = path[this.depth].id == this.category.id && path.length > this.depth + 1;
        this.changeDetector.detectChanges();
      }
    });
  }

  get isExpandable(){
    return this.category.children && this.category.children.length != 0;
  }
}