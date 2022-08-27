import { Component, Input } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'custom-chips',
  templateUrl: './custom-chips.component.html',
  styleUrls: ['./custom-chips.component.scss']
})
export class CustomChipsComponent {
  @Input() placeholder: string;
  @Input() chips: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.chips.push(value);
    }
    event.chipInput!.clear();
  }
  remove(chip: string): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }
}