import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { ArticleCrudComponent } from "./article-crud/article-crud.component";
import { CrudComponent } from "./crud.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    CrudComponent,
    ArticleCrudComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class CrudModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}