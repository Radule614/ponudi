import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.scss']
})
export class CustomRadioComponent{
  @Input() public form: FormGroup;
  @Input() public controlName: string;
  @Input() public value: string;
  
  @ViewChild('inputEl') inputEl: ElementRef;
  
  ngAfterViewInit(){
    this.inputEl.nativeElement.name = this.controlName;
  }

  setSelected(){
    this.form.controls['gender'].setValue(this.value);
  }
}