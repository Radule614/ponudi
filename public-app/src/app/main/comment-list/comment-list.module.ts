import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommentItemComponent } from "./comment-item/comment-item.component";
import { CommentListComponent } from "./comment-list.component";

@NgModule({
  declarations: [CommentListComponent, CommentItemComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  exports: [CommentListComponent]
})
export class CommentListModule {}