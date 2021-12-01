import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'frontend-notimplemented',
  templateUrl: './notimplemented.component.html',
  styles: []
})
export class NotimplementedComponent implements OnInit {

  ngOnInit(): void {
    //* hide loader
    $('#loader').addClass('loaded')
  }
}
