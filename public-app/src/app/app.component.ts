import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnsubscribeComponent } from './shared/unsubscribe/unsubscribe.component';
import { AppState } from './store';
import * as GeneralSelectors from './store/general/general.selectors';
import * as FromGeneral from './store/general/general.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('menu', [
      transition(':enter', [
        style({ transform: 'translateX(-340px)' }),
        animate('250ms ease-in-out', style({ transform: 'translateX(0px)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0px)' }),
        animate('250ms ease-in-out', style({ transform: 'translateX(-340px)' })),
      ])
    ]),
    trigger('contentAdjust', [
      state('true', style({marginLeft: '*'})),
      state('false', style({marginLeft: 0})),
      transition('true <=> false', animate('250ms ease-in-out'))
    ])
  ]
})
export class AppComponent extends UnsubscribeComponent implements OnInit {
  title = 'Ponudi';
  appLoading: boolean = false;
  menuOpen: boolean = true;

  constructor(private store: Store<AppState>, private renderer: Renderer2, ){ super() }

  ngOnInit(): void {
    this.store.dispatch(FromGeneral.loadApp());
    this.addToSubs = this.store.select(GeneralSelectors.selectLoading).subscribe(loading => { this.appLoading = loading });
    this.addToSubs = this.store.select(GeneralSelectors.selectDarkTheme).subscribe(darkTheme => {
      if(darkTheme) this.renderer.addClass(document.body, 'dark-theme');
      else          this.renderer.removeClass(document.body, 'dark-theme');
    });

    this.store.select(GeneralSelectors.selectMenuOpen).subscribe(menuOpen => { this.menuOpen = menuOpen })
  }
}
