import { Component, ElementRef, Input, ViewChild, AfterViewInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.scss']
})
export class CustomRadioComponent implements AfterViewInit{
  @Input() public form: UntypedFormGroup;
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