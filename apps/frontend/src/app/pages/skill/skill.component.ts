import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillService } from '../../services/skill.service';
declare var $: any;

@Component({
  selector: 'frontend-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  // id de la sesion, porque el otro metodo no me funcionó :'u
  public idsession;

  dataSkill: any = [];
  textByUser: string = "";

  // respuesta por tipo
  resType1: number = 0;
  resType2: number = 0;
  resType3: number = 0;
  resType4: number = 0;
  restype5: number = 0;
  restype6: number = 0;

  //arrays
  arrayType2 = [];
  arrayType3 = [];

  //checkbox de los typo pregunta 2
  checkbox: any;

  //variable de la progressbar
  progress: number = 0;

  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit(): void {
    //* hide loader
    $('#loader').addClass('loaded')
    if (this.idsession) {
      this.skillService.getSkill(this.idsession).subscribe(res => {
        this.dataSkill = res;
        console.log(this.dataSkill);
      });
    } else {
      this.router.navigate(['/dash/learn'])
    }

  }

  isCorrect(data): boolean {
    console.log(this.textByUser);

    return this.textByUser === data.question;
  }

  nextQuestion(data, i): void {
    // console.log("type: " + data.type);
    console.log(data);
    
    switch (data.type) {
      case 2:
        for (let i = 0; i < this.arrayType2.length; i++) {
          if (this.arrayType2[i].flag_estado !== 1 || this.arrayType2[i].order !==(i+1)) {
            console.log("ta mal");
            break;
          }else if (this.arrayType2.length == i+1) {
            console.log("ta bien");
            this.arrayType2 = [];
            this.progress += (100 / this.dataSkill.question.length);
            console.log(this.progress);
            
            document.getElementById('next').click();
            break;
          }
        }
        break;
      case 4:
        if (this.resType4 == 1) {
          console.log("ta bien");
          this.resType4 = 0;
          this.checkbox.checked = false;
          this.checkbox = null;
          this.progress += (100 / this.dataSkill.question.length);
          console.log(this.progress);
          
          document.getElementById('next').click();
        } else {
          console.log("ta mal");
        }
        break;
      case 5:
        for (let i = 0; i < this.arrayType3.length; i++) {
          if (this.arrayType3[i].flag_estado !== 1 || this.arrayType3[i].order !==(i+1)) {
            console.log("ta mal");
            break;
          }else if (this.arrayType3.length == i+1) {
            console.log("ta bien");
            this.arrayType3 = [];
            this.progress += (100 / this.dataSkill.question.length);
            console.log(this.progress);
            document.getElementById('next').click();
            break;
          }
        }
        break;
      case 6:
        break;
    }
    // console.log("posicion 'i': " + i);

    // console.log(data.option_question);

    // data.option_question.forEach(element => {
    //   console.log(element.option.url);
    // });


    // document.getElementById('next').click();

  }

  startQuestion(): void {
    document.getElementById('next').click();
  }

  //clic de la opcion 2
  optionselect2(data: any): void {
    // console.log(data);
    this.arrayType2.push({flag_estado: data.flag_estado, order: data.order});
    console.log(this.arrayType2);
    
  }

  //clic de la opcion 4
  optionselect4(data: any, i:number) {
    this.checkbox = <HTMLInputElement> document.getElementById(`${data.option.name}${i}`)
    console.log(data.option.name + i);
    
    console.log(this.checkbox.id);
    if (`${data.option.name}${i}` == this.checkbox.id) {
      this.checkbox.checked = true;
    }
    // var msg = new SpeechSynthesisUtterance();
    // msg.lang = 'en-US';
    // msg.text = data.option.name;
    // msg.volume = 100;
    // speechSynthesis.speak(msg);
    this.textToVoice(data.option.name);
    this.resType4 = data.flag_estado;
  }

  //metodo que convierte texto a voz
  textToVoice(text: string) {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = 'en-US';
    msg.text = text;
    msg.volume = 100;
    speechSynthesis.speak(msg);
  }

  //opcion 5
  voiceOption5(data: any){
    // console.log(data.text);
    
    // var msg = new SpeechSynthesisUtterance();
    // msg.lang = 'en-US';
    // msg.text = data.text;
    // msg.volume = 100;
    // speechSynthesis.speak(msg);
    this.textToVoice(data.text);
  }
  optionselect5(data: any){

    this.arrayType3.push({flag_estado: data.flag_estado, order: data.order});
    console.log(this.arrayType3);
  }

  //opcion 6
  voiceOption6(data: any) {
    this.textToVoice(data.text);
  }
  ptionselect6(data: any){

  }

}
