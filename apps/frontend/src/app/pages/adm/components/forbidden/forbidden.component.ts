import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'frontend-forbidden',
  templateUrl: './forbidden.component.html',
  styles: []
})
export class ForbiddenComponent implements OnInit {

  ngOnInit(): void {
    //* hide loader
    $('#loader').addClass('loaded')
  }
}
