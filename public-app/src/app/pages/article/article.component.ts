import { Component, OnInit } from "@angular/core";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from '../../store/article/article.selectors';
import * as FromArticle from '../../store/article/article.actions';
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/model/category.model";
import { Image } from "src/app/model/image.model";
import { Comment } from "src/app/model/comment.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends UnsubscribeComponent implements OnInit{
  article: Article | null;
  articleId: string;
  categoryPath: Category[];

  //temp
  images: Image[] = [
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' },
    { url: 'image_placeholder.jpg' }
  ];

  comments: Comment[] = [
    { user: 'rade', content: 'komentar 123', date: '19.8.2022'},
    { user: 'rade2', content: 'komentar 123j k;sdajkdp sajd kpsa', date: '19.8.2022'},
    { user: 'rade2', content: 'komentar [l[dsak aslpd kpq23 dsakl[d sak]]]', date: '19.8.2022'},
    { user: 'rade3', content: 'komentar  pjlkdsap]kd sajml[ fd', date: '19.8.2022'},
    { user: 'rade', content: 'komentar 1111111111111111111111', date: '19.8.2022'}
  ];
  //temp end

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private categoryService: CategoryService){ super() }

  ngOnInit(): void {
    this.addToSubs = this.route.params.subscribe(data => {
      this.articleId = data['id'];
      this.store.dispatch(FromArticle.fetchArticle({ id: this.articleId }))
    });

    this.addToSubs = this.store.select(ArticleSelectors.selectArticle).subscribe(article => { 
      this.article = article;
      console.log(article);
    });
    this.addToSubs = this.categoryService.getCurrentCategoryPath().subscribe(path => { this.categoryPath = path });
  }

}