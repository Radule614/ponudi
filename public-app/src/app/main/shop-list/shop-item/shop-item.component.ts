import { ViewportScroller } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import * as FromGeneral from "src/app/store/general/general.actions";
import * as FromShop from "src/app/store/shop/shop.actions";
import * as AuthSelectors from "src/app/store/auth/auth.selectors";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { take } from "rxjs";
import { User } from "src/app/model/user.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { Shop } from "src/app/model/shop.model";
import { LatLng } from "leaflet";


@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopItemComponent extends UnsubscribeComponent implements OnInit {
  @Input() shop: Shop;
  @Input() editable: boolean = false;
  user: User | null;

  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  constructor(private viewportScroller: ViewportScroller,
    private router: Router,
    private store: Store<AppState>,
    private modalService: MdbModalService) { super() }

  ngOnInit(): void {
    this.addToSubs = this.store.select(AuthSelectors.selectUser).subscribe(user => this.user = user);
  }

  btnDetailsClick(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  btnEditClick(): void {
    this.router.navigate(['/dashboard/shop/edit', this.shop._id]);
  }

  btnDeleteClick(): void {
    this.openDeleteModal();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.pipe(take(1)).subscribe(message => {
      if (message == 'confirm') {
        this.store.dispatch(FromGeneral.activateLoading());
        this.store.dispatch(FromShop.deleteShop({ id: this.shop._id, userId: this.user!._id }));
      }
    });
  }

  get shopLocation(): LatLng {
    const loc = this.shop.location;
    return new LatLng(loc.latitude, loc.longitude);
  }
}