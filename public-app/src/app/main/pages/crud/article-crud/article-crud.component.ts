import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/store";

@Component({
  selector: 'app-article-crud',
  templateUrl: './article-crud.component.html',
  styleUrls: ['./article-crud.component.scss']
})
export class ArticleCrudComponent implements OnInit, OnDestroy{
  form: UntypedFormGroup;
  errorMessages: string[] = [];
  loading: boolean = false;

  subs: Subscription[] = [];

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      'content':      new UntypedFormControl(null, Validators.required),
      'price':        new UntypedFormControl(null),
      'description':  new UntypedFormControl(null),
      'currency':     new UntypedFormControl(null)
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onSubmit(){
    
  }
}