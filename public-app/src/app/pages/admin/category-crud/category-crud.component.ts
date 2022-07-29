import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Category } from "src/app/model/category.model";
import { CategoryDTO } from "src/app/services/category.service";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as CategorySelectors from "src/app/store/category/category.selectors";
import * as FromCategory from "src/app/store/category/category.actions";
import * as FromGeneral from "src/app/store/general/general.actions";
import { allIconNames } from "src/app/main/main.module";

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.scss']
})
export class CategoryCrudComponent extends UnsubscribeComponent implements OnInit {
  categoryForm: UntypedFormGroup;
  errorMessages: string[] = [];
  loading: boolean = false;
  optionForm: UntypedFormGroup;
  optionFormActive: boolean = false;
  categoryPath: Category[] = [];

  inheritedOptions: string[] = [];
  newOptions: string[] = [];
  allIconNames: any[];
  
  constructor(private store: Store<AppState>) { super() }
  ngOnInit(): void {
    this.addToSubs = this.store.select(CategorySelectors.selectErrors).subscribe(data => {
      this.errorMessages = data;
    });
    this.categoryForm = new UntypedFormGroup({
      'name': new UntypedFormControl(null, Validators.required),
      'icon': new UntypedFormControl(null)
    });
    this.optionForm = new UntypedFormGroup({
      'option': new UntypedFormControl(null, [Validators.required, Validators.maxLength(20)])
    });
    this.allIconNames = allIconNames;
  }

  pathChangedHandler(data: Category[]){
    this.categoryPath = [];
    this.inheritedOptions.length = 0;
    if(data[data.length-1].id != 'new'){
      return;
    }
    this.categoryPath = data;
    for(let cat of data){
      if(cat.additionalFields != undefined){
        for(let field of cat.additionalFields){
          this.inheritedOptions.push(field)
        }
      }
    }
  }

  onSubmit(){
    let formData = this.categoryForm.getRawValue();
    if(this.categoryForm.valid && !this.categoryError){
      this.store.dispatch(FromCategory.clearErrors())
      this.store.dispatch(FromGeneral.activateLoading());
      let data: CategoryDTO = {
        name: formData.name,
        icon: formData.icon,
        children: [],
        parent: this.categoryParent,
        additionalFields: this.newOptions
      };
      this.store.dispatch(FromCategory.createCategory({ category: data }));
    }else{
      let messages: string[] = [];
      if(this.categoryError) messages.push('lokacija nove kategorije mora biti izabrana');
      if(this.categoryForm.controls['name'].hasError('required')) messages.push('naziv kategorije je obavezan');
      this.store.dispatch(FromCategory.createCategoryFailed({ messages: messages }));
    }
  }

  onOptionSubmit(){
    if(this.optionForm.valid){
      this.newOptions.push(this.optionForm.getRawValue().option);
      this.optionForm.reset();
      this.optionFormActive = false;
    }
  }

  get categoryParent(){
    let length = this.categoryPath.length;
    if(length > 1) return this.categoryPath[length-2].id;
    return null;
  }

  get categoryError(){
    if(this.categoryPath.length == 0) return true;
    return false;
  }
}