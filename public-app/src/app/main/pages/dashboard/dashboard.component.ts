import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import * as ArticleSelectors from '../../../store/article/article.selectors';
import * as FromArticle from '../../../store/article/article.actions';
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  categoryId: string = "";
  subs: Subscription[] = [];

  articles: Article[] = [];

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(FromArticle.fetchAllByUser())
    
    let sub = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      this.articles = data;
      console.log(data);
    })
    this.subs.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}