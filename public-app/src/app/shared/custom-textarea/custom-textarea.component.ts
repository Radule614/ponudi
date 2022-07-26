import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['../shared-styles.scss', './custom-textarea.component.scss']
})
export class CustomTextareaComponent {
  @Input() form: UntypedFormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;
}