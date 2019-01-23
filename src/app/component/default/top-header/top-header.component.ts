import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.less']
})
export class TopHeaderComponent implements OnInit {
  isCollapsed = false;
  @Output() nzCollapsed = new EventEmitter<void>();

  constructor(private router:Router) { }

  ngOnInit() {
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.nzCollapsed.emit();
  }

  loginOut(){
    this.router.navigateByUrl('login')
  }
}
