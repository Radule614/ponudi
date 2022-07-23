import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Category } from "src/app/model/category.model";

@Component({
  selector: 'app-nav-category-expander',
  templateUrl: './nav-category-expander.component.html',
  styleUrls: ['../shared-styles.scss', './nav-category-expander.component.scss'],
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
export class NavCategoryExpanderComponent {
  @Input() category: Category;
  @Input() mainNav: boolean;

  expanded: boolean = false;
}