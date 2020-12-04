import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  activeUser = sessionStorage.getItem('activeUser');

  constructor() {}

  ngOnInit(): void {}

  activeUserIsAdmin(): boolean {
    if (this.activeUser == 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
