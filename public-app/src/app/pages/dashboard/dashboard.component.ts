import { Component } from "@angular/core";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubscribeComponent{
  constructor(){ super() }

  ngOnInit(): void {}
}