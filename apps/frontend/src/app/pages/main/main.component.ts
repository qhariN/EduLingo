import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'frontend-main',
  templateUrl: './main.component.html',
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document) { }

  ngOnInit(): void {
    //* hide loader
    $('#loader').addClass('loaded')
  }

}
