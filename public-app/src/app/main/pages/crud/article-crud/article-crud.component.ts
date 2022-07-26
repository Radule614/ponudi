import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { Category } from "src/app/model/category.model";
import { User } from "src/app/model/user.model";
import { AppState } from "src/app/store";
import * as FromArticle from "src/app/store/article/article.actions";
import * as ArticleSelectors from "src/app/store/article/article.selectors";
import * as AuthSelectors from "src/app/store/auth/auth.selectors";

@Component({
  selector: 'app-article-crud',
  templateUrl: './article-crud.component.html',
  styleUrls: ['./article-crud.component.scss']
})
export class ArticleCrudComponent implements OnInit, OnDestroy{
  form: UntypedFormGroup;
  errorMessages: string[] = [];
  loading: boolean = false;
  loggedUser: User | null = null;

  subs: Subscription[] = [];
  selectedCategory: Category | null = null;

  currencies: Object[] = [
    { name: 'BAM', value: 'BAM' },
    { name: 'EUR', value: 'EUR' }
  ]

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(FromArticle.clearErrors())
    let sub = this.store.select(ArticleSelectors.selectErrors).subscribe(errors => {
      this.errorMessages = errors;
    });
    this.subs.push(sub);
    sub = this.store.select(AuthSelectors.selectUser).subscribe(user => {
        this.loggedUser = user;
    });
    this.subs.push(sub);
    this.form = new UntypedFormGroup({
      'content':      new UntypedFormControl(null, Validators.required),
      'price':        new UntypedFormControl(null, Validators.required),
      'description':  new UntypedFormControl(null),
      'currency':     new UntypedFormControl(null)
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  categorySelectedHandler(event: Category){
    this.selectedCategory = event;
  }

  onSubmit(){
    if(this.loggedUser == null || !this.loggedUser._id) return;
    if(this.form.status == 'VALID' && !this.categoryError){
      this.store.dispatch(FromArticle.clearErrors())
      //this.store.dispatch(fromAuth.setLoading({loading: true}));
      
      let data: Article = this.form.getRawValue();
      data.owner = this.loggedUser._id;
      data.category = this.selectedCategory?.id;
      data.price = + data.price;
      this.store.dispatch(FromArticle.createArticle({ article: data }))
    }else{
      let messages: string[] = [];
      if(this.form.controls['content'].hasError('required')) messages.push('naslov artikla je obavezan');
      if(this.form.controls['price'].hasError('required')) messages.push('cijena je obavezna');
      if(this.categoryError) messages.push('kategorija mora biti izabrana');
      this.store.dispatch(FromArticle.createArticleFailed({ messages: messages }));
    }
    
  }

  get categoryError(){
    if(!this.selectedCategory) return true;
    if(this.selectedCategory.children && this.selectedCategory.children.length != 0){
      return true;
    }
    return false;
  }
}