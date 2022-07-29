import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Input() static: string[];
  @Input() dynamic: string[];

  deleteHandler(option: string) {
    let index = this.dynamic.indexOf(option);
    if(index != -1){
      this.dynamic.splice(index, 1);
    }
  }
}