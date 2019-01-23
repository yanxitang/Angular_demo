import { Component, Injectable } from '@angular/core';
import { globalService } from './service/global.service'
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public global: globalService) {
  }
 

}
