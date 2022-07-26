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

  empty: boolean = true;
  focused: boolean = false;

  valueChanged(event: any){
    this.empty = event.target.value == '';
  }

  onFocus(event: any){
    if(!this.focused) this.focused = true;
  }

  onBlur(event: any){
    if(this.focused) this.focused = false;
  }
}