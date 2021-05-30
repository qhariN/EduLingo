import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';


/**
 * tipos de preguntas
 * escucha y escribe = 1
 * escribe en español = 2
 * escribe en ingles = 3
**/
const DataDummy = [
  {
    question: "How are you?",
    answer: "how are you?",
    type: 1,
    id: 1
  },
  {
    question: "Yo tengo una manzana",
    answer: "i have an apple",
    type: 3,
    id: 2

  },
  {
    question: "My name is Jacob",
    answer: "mi nombre es jacob",
    type: 2,
    id: 3
  },
  { 
    question: "What is your name",
    answer: "what is your name",
    type: 1,
    id: 4

  },
  { 
    question: "Good morning",
    answer: "buenos dias",
    type: 2,
    id: 5
  }
];

@Component({
  selector: 'frontend-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  data = DataDummy.slice();
  dataSkill: any = [];
  textByUser: string = "";

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.skillService.getSkill().subscribe(res => {
      this.dataSkill = res;
      console.log(this.dataSkill);
    });
  }

  isCorrect(data): boolean {
    console.log(this.textByUser);
    
    return this.textByUser === data.question;
  }

  nextQuestion(data): void {
    console.log(data.type);
    // console.log(this.isCorrect(data))
    // if(this.isCorrect(data)){
    //   document.getElementById('next').click();
    // }

    document.getElementById('next').click();

  }

  startQuestion(): void {
    document.getElementById('next').click();
  }

  

}
