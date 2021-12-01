import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionQuestion } from '../../../models/skill';

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
    console.log(this.dataSkill);
  }

  getCorrectOptionByOrder(options: OptionQuestion[]){
      const data = options.filter(opt => opt.order != null).sort((a, b) => a.order > b.order ? 1 : -1);
      const correct =  data.map( item => {
        return item['option'].name;
      });
      return correct.join(' ');
  }

  getOptionChecked(options){
    if (options.length >= 1) {
      const myOption =  options.map( item => {
        return item['option'].name;
      });
      return myOption.join(' ');
    } else {
      console.log(options);
      return options.option.name
    }
  }

}
