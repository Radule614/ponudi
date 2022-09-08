import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Shop } from 'src/app/model/shop.model';
import { UnsubscribeComponent } from 'src/app/shared/unsubscribe/unsubscribe.component';
import { AppState } from 'src/app/store';
import * as FromShop from 'src/app/store/shop/shop.actions';
import * as FromGeneral from 'src/app/store/general/general.actions';
import * as ShopSelectors from 'src/app/store/shop/shop.selectors';
import * as AuthSelectors from 'src/app/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LatLng } from 'leaflet';
@Component({
  selector: 'app-shop-crud',
  templateUrl: './shop-crud.component.html',
  styleUrls: ['../shared.scss', './shop-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopCrudComponent extends UnsubscribeComponent implements OnInit {
  mode: string = 'add';
  shopForEdit: Shop | null;
  loggedUser: User | null = null;
  errorMessages$: Observable<string[]> = this.store.select(ShopSelectors.selectErrors);
  form: UntypedFormGroup;

  constructor(private store: Store<AppState>, private viewportScroller: ViewportScroller, private route: ActivatedRoute, private router: Router) { super() }
  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.store.dispatch(FromShop.clearErrors())
    this.initForms();
    this.initSubs();
  }

  initSubs(): void {
    let shopId = this.route.snapshot.params['id'];
    if (shopId) {
      this.mode = 'edit';
      this.addToSubs = this.store.select(ShopSelectors.selectShop).subscribe(shop => {
        this.shopForEdit = shop
        this.fillExistingData();
      });
    }
    this.addToSubs = this.store.select(AuthSelectors.selectUser).subscribe(user => this.loggedUser = user);
  }

  initForms(): void {
    this.form = new UntypedFormGroup({
      'name': new UntypedFormControl(null, Validators.required),
      'address': new UntypedFormControl(null, Validators.required),
      'telephoneNumber': new UntypedFormControl(null, Validators.required),
      'serviceType': new UntypedFormControl(null, Validators.required)
    });
  }

  private fillExistingData(): void {
    const shop = this.shopForEdit;
    if (this.mode == 'edit' && shop) {
      const controls = this.form.controls;
      controls['name'].setValue(shop.name || '');
      controls['address'].setValue(shop.address || '');
      controls['telephoneNumber'].setValue(shop.telephoneNumber || '');
      controls['serviceType'].setValue(shop.serviceType || '');
    }
  }

  onSubmit() {
    if (this.loggedUser == null || !this.loggedUser._id) return;
    if (this.form.status == 'VALID') {
      this.store.dispatch(FromShop.clearErrors());
      this.store.dispatch(FromGeneral.activateLoading());
      let data: Shop = this.form.getRawValue();
      data.location = { latitude: 0, longitude: 0 };
      let props = { shop: data };
      if (this.mode == 'edit') {
        this.store.dispatch(FromShop.editShop({ ...props, id: this.shopForEdit!._id }));
      } else {
        this.store.dispatch(FromShop.createShop(props))
      }
    } else {
      let messages: string[] = [];
      if (this.form.controls['name'].hasError('required')) messages.push('naziv šopa je obavezan');
      if (this.form.controls['address'].hasError('required')) messages.push('adresa šopa je obavezna');
      if (this.form.controls['serviceType'].hasError('required')) messages.push('vrsta servisa je obavezna');
      if (this.form.controls['telephoneNumber'].hasError('required')) messages.push('broj telefona je obavezan');
      this.store.dispatch(FromShop.shopError({ messages: messages }));
    }
  }

  cancel(): void {
    this.router.navigate(['dashboard']);
  }

  locationHandler(location: LatLng){
    console.log(location);
  }
}