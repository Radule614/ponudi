import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss']
})
export class CustomTextareaComponent {
  @Input() form: UntypedFormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;
}