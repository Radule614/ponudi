import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { Category } from "src/app/model/category.model";
import { User } from "src/app/model/user.model";
import { AppState } from "src/app/store";
import * as FromGeneral from "src/app/store/general/general.actions";
import * as FromArticle from "src/app/store/article/article.actions";
import * as ArticleSelectors from "src/app/store/article/article.selectors";
import * as AuthSelectors from "src/app/store/auth/auth.selectors";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";
import { ViewportScroller } from "@angular/common";
import { Image } from "src/app/model/image.model";

import * as CustomRichtext from 'src/app/richtext/ckeditor.js';

@Component({
  selector: 'app-article-crud',
  templateUrl: './article-crud.component.html',
  styleUrls: ['./article-crud.component.scss']
})
export class ArticleCrudComponent extends UnsubscribeComponent implements OnInit{
  mode: string = 'add';
  articleForEdit: Article | null;

  form: UntypedFormGroup;
  errorMessages: string[] = [];
  loading: boolean = false;
  loggedUser: User | null = null;
  
  selectedCategory: Category | null = null;
  categoryPath: Category[] = [];
  
  options: string[] = [];
  optionsForm: UntypedFormGroup;

  descriptionEdit: boolean = false;
  descriptionForm: UntypedFormGroup;

  currencies: Object[] = [
    { name: 'BAM', value: 'BAM' },
    { name: 'EUR', value: 'EUR' }
  ]

  public Editor = CustomRichtext.Editor;

  //temp
  images: Image[] = [
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' }
  ];
  //temp end

  constructor(private store: Store<AppState>, 
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService, 
              private viewportScroller: ViewportScroller){ super() }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.store.dispatch(FromArticle.clearErrors())
    this.initForms();
    this.initSubs();
  }

  private initForms(): void {
    this.form = new UntypedFormGroup({
      'content':      new UntypedFormControl(null, Validators.required),
      'price':        new UntypedFormControl(null, Validators.required),
      'description':  new UntypedFormControl(null),
      'currency':     new UntypedFormControl(null)
    });
    this.optionsForm = new UntypedFormGroup({});
    this.descriptionForm = new UntypedFormGroup({
      'description':  new UntypedFormControl(null),
    })
  }

  private initSubs(): void {
    let articleId = this.route.snapshot.params['id'];
    if(articleId){
      this.mode = 'edit';
      this.addToSubs = this.store.select(ArticleSelectors.selectArticle).subscribe(article => { 
        this.articleForEdit = article;
        this.fillExistingData();
       });
      this.addToSubs = this.categoryService.getCurrentCategoryPath().subscribe(path => {
        this.categoryPath = path;
        this.categoryPathHandler(path);
      });
    }
    this.addToSubs = this.store.select(ArticleSelectors.selectErrors).subscribe(errors => { this.errorMessages = errors });
    this.addToSubs = this.store.select(AuthSelectors.selectUser).subscribe(user => { this.loggedUser = user });
  }

  private fillExistingData(): void{
    const article = this.articleForEdit;
    if(this.mode == 'edit' && article){
      const controls = this.form.controls;
      const fields = article.additionalFields;
      const optionControls = this.optionsForm.controls;

      controls['content'].setValue(article.content || '');
      controls['price'].setValue(article.price || '');
      controls['currency'].setValue(article.currency || '');
      controls['description'].setValue(article.description || '');

      for(let field in fields) {
        const control = optionControls[field];
        if(control != undefined) control.setValue(fields[field]);
      }
    }
  }

  onSubmit(){
    if(this.loggedUser == null || !this.loggedUser._id) return;
    if(this.form.status == 'VALID' && !this.categoryError){
      this.store.dispatch(FromArticle.clearErrors())
      this.store.dispatch(FromGeneral.activateLoading());
      
      let data: Article = this.form.getRawValue();
      data.owner = this.loggedUser._id;
      data.category = this.selectedCategory?.id;
      data.price = + data.price;
      data.additionalFields = this.optionsForm.getRawValue();

      console.log(data);
      if(this.mode=='edit'){
        this.store.dispatch(FromArticle.editArticle({ id: this.articleForEdit!._id, article: data }))
      }else{
        this.store.dispatch(FromArticle.createArticle({ article: data }))
      }
    }else{
      let messages: string[] = [];
      if(this.form.controls['content'].hasError('required')) messages.push('naslov artikla je obavezan');
      if(this.form.controls['price'].hasError('required')) messages.push('cijena je obavezna');
      if(this.categoryError) messages.push('kategorija mora biti izabrana');
      this.store.dispatch(FromArticle.articleError({ messages: messages }));
    }
  }

  categoryPathHandler(event: Category[]){
    this.clearOptionsForm();
    this.options.length = 0;
    this.categoryPath = event;
    this.selectedCategory = null;

    if(this.categoryPath.length==0) return;
    this.selectedCategory = event[event.length - 1];
    if(this.categoryError) return;
    for(let cat of event){
      if(cat.additionalFields){
        for(let field of cat.additionalFields){
          this.options.push(field);
        }
      }
    }
    this.setOptionsForm();
  }

  clearOptionsForm(){
    for(let option of this.options){
      this.optionsForm.removeControl(option);
    }
  }

  setOptionsForm(){
    for(let option of this.options){
      this.optionsForm.addControl(option, new UntypedFormControl(null));
    }
  }

  cancel(): void{
    this.clearOptionsForm();
    this.router.navigate(['dashboard']);
  }

  fileSelectedHandler(file: File) {
    console.log(file);
    this.images.push({ url: URL.createObjectURL(file) });
  }

  openDescriptionEdit(){
    this.descriptionForm.controls['description'].setValue(this.form.getRawValue().description);
    this.descriptionEdit = true;
  }

  descriptionSubmit(){
    this.form.controls['description'].setValue(this.descriptionForm.getRawValue().description);
    this.descriptionEdit = false;
  }

  get categoryError(){
    if(this.mode=='edit') return false;
    if(!this.selectedCategory) return true;
    if(this.selectedCategory.children && this.selectedCategory.children.length != 0){
      return true;
    }
    return false;
  }
}