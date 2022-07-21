import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navRoutes: Route[];

  constructor(private router: Router) { 
    let mainRoute = this.router.config.filter(route => route.path == '')[0];
    this.navRoutes = mainRoute.children!.filter(route => route.data && route.data['nav']);
  }

  ngOnInit(): void {
    //console.log(this.navRoutes);
  }

}
