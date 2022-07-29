import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss']
})
export class OptionItemComponent {
  @Input() option: string;
  @Input() editable: boolean;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  
}