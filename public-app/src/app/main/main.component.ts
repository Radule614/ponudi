import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/index";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { 
    this.store.select('auth').subscribe(state => {
      console.log(state);
    })
  }
}