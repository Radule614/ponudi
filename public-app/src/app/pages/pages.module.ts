import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BreadcrumbsModule } from "../main/breadcrumbs/breadcrumbs.module";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account/account.component";
import { ArticleComponent } from "./article/article.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { ExploreComponent } from "./explore/explore.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  declarations: [
    AccountComponent,
    ArticleComponent,
    ExploreComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    BreadcrumbsModule
  ],
  exports: []
})
export class PagesModule {
  
}