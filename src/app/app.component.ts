import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotbyte';

  //to disable backward browsing in  browser

  constructor(private location: Location) {}

  @HostListener('window:popstate')
  onPopState() {
    this.location.forward();
  }
}
