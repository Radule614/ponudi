import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['../shared-styles.scss', './custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() form: UntypedFormGroup;
  @Input() controlName: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() error: boolean;
}