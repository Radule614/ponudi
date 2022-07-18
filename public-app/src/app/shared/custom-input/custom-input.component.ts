import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() public form: FormGroup;
  @Input() public controlName: string;
  @Input() public type: string;
  @Input() public placeholder: string;

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