import { ViewportScroller } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as FromGeneral from "src/app/store/general/general.actions";
import * as FromArticle from "src/app/store/article/article.actions";
import * as AuthSelectors from "src/app/store/auth/auth.selectors";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { take } from "rxjs";
import { User } from "src/app/model/user.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";


@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent extends UnsubscribeComponent implements OnInit{
  @Input() article: Article;
  @Input() editable: boolean = false;
  user: User | null;

  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  constructor(private viewportScroller: ViewportScroller, 
              private router: Router, 
              private store: Store<AppState>,
              private modalService: MdbModalService){ super() }

  ngOnInit(): void { 
    this.addToSubs = this.store.select(AuthSelectors.selectUser).subscribe(user => {
      this.user = user;
    });
  }

  btnDetailsClick(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  btnEditClick(): void {
    this.router.navigate(['/dashboard/edit', this.article._id]);
  }

  btnDeleteClick(): void {
    this.openDeleteModal();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.pipe(take(1)).subscribe(message => {
      if(message=='confirm'){
        this.store.dispatch(FromGeneral.activateLoading());
        this.store.dispatch(FromArticle.deleteArticle({ id: this.article._id, userId: this.user!._id}));
      }
    });
  }

  get displayImage(){
    if(this.article.pictures && this.article.pictures.length > 0){
      return `url("${this.article.pictures[0]}")`;
    }
    return `url("")`;
  }
}