import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() public form: UntypedFormGroup;
  @Input() public controlName: string;
  @Input() public type: string;
  @Input() public placeholder: string;
  @Input() public error: boolean;

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