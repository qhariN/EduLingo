import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'frontend-modal-results',
  templateUrl: './modal-results.component.html',
  styleUrls: ['./modal-results.component.scss']
})
export class ModalResultsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  public data

  public dataSkill

  ngOnInit(): void {
    console.log("owo");
    console.log(this.dataSkill);
    
  
    
  }

}
