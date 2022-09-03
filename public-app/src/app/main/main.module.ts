import { NgModule } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

export const allIconNames: any = [];

@NgModule({
  imports: [MdbModalModule]
})
export class MainModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
    library.addIconPacks(far);
    for(let icon in fas){
      allIconNames.push(fas[icon].iconName)
    }
  }
}