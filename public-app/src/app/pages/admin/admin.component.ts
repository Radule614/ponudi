import { Component, OnInit } from "@angular/core";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends UnsubscribeComponent implements OnInit {

  constructor() { super() }

  ngOnInit(): void {}
}