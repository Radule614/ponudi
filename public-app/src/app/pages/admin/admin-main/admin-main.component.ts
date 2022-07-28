import { Component, OnInit } from "@angular/core";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent extends UnsubscribeComponent implements OnInit {

  constructor() { super() }

  ngOnInit(): void {}
}