import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'custom-select',
  templateUrl: 'custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() options: Object[] | undefined = [];

  constructor(){}

  ngOnInit(): void {}

  getName(option: any){
    return option['name'] != undefined ? option['name'] : option;
    
  }
  getValue(option: any){
    return option['value'] != undefined ? option['value'] : option;
  }
  get getOptions() {
    return this.options ? this.options : [];
  }

}