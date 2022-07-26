import { Component, ElementRef, Input, ViewChild, AfterViewInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.scss']
})
export class CustomRadioComponent implements AfterViewInit{
  @Input() form: UntypedFormGroup;
  @Input() controlName: string;
  @Input() value: string;
  
  @ViewChild('inputEl') inputEl: ElementRef;
  
  ngAfterViewInit(){
    this.inputEl.nativeElement.name = this.controlName;
  }

  setSelected(){
    this.form.controls['gender'].setValue(this.value);
  }
}