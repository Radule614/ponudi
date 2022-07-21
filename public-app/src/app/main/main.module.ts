import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { NavigationComponent } from "./navigation/navigation.component";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
    MainRoutingModule
  ],
  exports: [MainComponent]
})
export class MainModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}