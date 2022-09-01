import { Component, Input } from "@angular/core";
import { AdditionalField } from "src/app/model/article.model";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Input() static: AdditionalField[];
  @Input() dynamic: AdditionalField[];

  deleteHandler(option: AdditionalField) {
    let index = -1;
    for(let i = 0; i < this.dynamic.length; i++){
      if(option.field == this.dynamic[i].field) index = i;
    }
    if(index != -1){
      this.dynamic.splice(index, 1);
    }
  }
}