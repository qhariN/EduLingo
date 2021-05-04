import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'frontend-notfound',
  templateUrl: './notfound.component.html',
  styles: []
})
export class NotfoundComponent implements OnInit {

  ngOnInit(): void {
    $('body').addClass('loaded')
  }
}
