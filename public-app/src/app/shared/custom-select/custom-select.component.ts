import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-select',
  templateUrl: 'custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() form: UntypedFormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() options: Object[] = [];
}