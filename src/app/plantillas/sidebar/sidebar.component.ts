import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebar:string;

  constructor() {
    this.sidebar = "close";
   }

  ngOnInit(): void {
  }

  ajustarSidebar() {
    this.sidebar = this.sidebar!=="close"?"close":"open";

}

}
