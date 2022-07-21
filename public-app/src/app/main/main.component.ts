import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "../store/index";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}