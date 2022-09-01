import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  template: ''
})
export class UnsubscribeComponent implements OnDestroy {
  private subs: Subscription[] = [];

  set addToSubs(sub: Subscription) {
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}