import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AdditionalField } from "src/app/model/article.model";

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss']
})
export class OptionItemComponent {
  @Input() option: AdditionalField;
  @Input() editable: boolean;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  
}