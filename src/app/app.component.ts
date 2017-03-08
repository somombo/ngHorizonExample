import { Component } from '@angular/core';
import {HorizonService} from "./horizon.service";


@Component({
  selector: 'app-root',
  template: `
  <h1>
    {{hz.getData()}}
  </h1>
  <button (click)="hz.sendData({'hello':'world'})"></button>
<!--  <router-outlet></router-outlet>-->
  `,
  styles: [],
  providers: [HorizonService]
})
export class AppComponent {
  constructor(public hz: HorizonService){

  }
}
