import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.less']
})
export class ListDetailComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.router)
  }

}
