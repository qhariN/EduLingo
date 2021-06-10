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
  resType5: number = 0;
  resType6: number = 0;

  //arrays
  arrayType2 = [];
  arrayType3 = [];

  //checkbox de los typo pregunta 2
  checkbox: any;

  //variable de la progressbar
  progress: number = 0;

  //variable para la validacion de las preguntas
  completed = [];

  constructor(public skillService: SkillService, private router: Router) { }

  ngOnInit(): void {
    //* hide loader
    $('#loader').addClass('loaded')
    if (this.idsession) {
      this.skillService.getSkill(this.idsession).subscribe(res => {
        this.dataSkill = res;
        this.dataSkill.question.forEach(() => this.completed.push(false));
      });
    } else {
      this.router.navigate(['/dash/learn'])
    }
  }

  // nextQuestion(data, i) {
  //   // console.log("type: " + data.type);
  //   console.log(data);

  //   switch (data.type) {
  //     case 2:
  //       for (let i = 0; i < this.arrayType2.length; i++) {
  //         if (this.arrayType2[i].flag_estado !== 1 || this.arrayType2[i].order !== (i + 1)) {
  //           console.log("ta mal");
  //           break;
  //         } else if (this.arrayType2.length == i + 1) {
  //           console.log("ta bien");
  //           this.arrayType2 = [];
  //           this.progress += (100 / this.dataSkill.question.length);
  //           console.log(this.progress);

  //           document.getElementById('next').click();
  //           // this.completed = true;
  //           break;
  //         }
  //       }
  //       break;
  //     case 4:
  //       if (this.resType4 == 1) {
  //         console.log("ta bien");
  //         this.resType4 = 0;
  //         this.checkbox.checked = false;
  //         this.checkbox = null;
  //         this.progress += (100 / this.dataSkill.question.length);
  //         console.log(this.progress);

  //         document.getElementById('next').click();
  //       } else {
  //         console.log("ta mal");
  //       }
  //       break;
  //     case 5:
  //       for (let i = 0; i < this.arrayType3.length; i++) {
  //         if (this.arrayType3[i].flag_estado !== 1 || this.arrayType3[i].order !== (i + 1)) {
  //           console.log("ta mal");
  //           break;
  //         } else if (this.arrayType3.length == i + 1) {
  //           console.log("ta bien");
  //           this.arrayType3 = [];
  //           this.progress += (100 / this.dataSkill.question.length);
  //           console.log(this.progress);
  //           document.getElementById('next').click();
  //           break;
  //         }
  //       }
  //       break;
  //     case 6:
  //       break;
  //   }
  // }

  startQuestion(): void {
    document.getElementById('next').click();
  }

  arrayEquals(a, b) {
    return  a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  //clic de la opcion 2
  optionselect2(data: any, index: number): void {
    this.arrayType2.push({ flag_estado: data.flag_estado, order: data.order });

    let options = this.dataSkill.question[index].option_question.slice();
    let newOptions = []

    options = options.filter(data => data.flag_estado == 1);
    options = options.sort((a, b) => a.order - b.order);
    options.forEach(e => newOptions.push({ flag_estado: e.flag_estado, order: e.order }));

    if (JSON.stringify(newOptions) == JSON.stringify(this.arrayType2)) {
      console.log("ta bien");
      this.completed[index] = true;
      this.arrayType2 = [];
    } else {
      console.log("ta mal");
    }

  }

  //clic de la opcion 4
  optionselect4(data: any, index: number) {
    this.checkbox = <HTMLInputElement>document.getElementById(`${data.option.name}${index}`)
    this.textToVoice(data.option.name);

    if (`${data.option.name}${index}` == this.checkbox.id) {
      this.checkbox.checked = true;
    }

    this.resType4 = data.flag_estado;

    if (this.resType4 === 1) {
      this.completed[index] = true;
    }
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
  voiceOption5(data: any, index: number) {
    this.textToVoice(data.text);
  }
  optionselect5(data: any, index: number) {
    this.arrayType3.push({ flag_estado: data.flag_estado, order: data.order });

    let options = this.dataSkill.question[index].option_question.slice();
    let newOptions = []

    options = options.filter(data => data.flag_estado == 1);
    //ordenar el array de objetos de mayor a menor segun "order"
    options = options.sort((a, b) => a.order - b.order);
    options.forEach(e => newOptions.push({ flag_estado: e.flag_estado, order: e.order }));

    if (JSON.stringify(newOptions) == JSON.stringify(this.arrayType3)) {
      console.log("ta bien");
      this.completed[index] = true;
      this.arrayType3 = [];
    } else {
      console.log("ta mal");
    }
  }

  //opcion 6
  voiceOption6(data: any) {
    this.textToVoice(data.text);
  }
  optionselect6(data: any, index: number) {
    this.resType6 = data.flag_estado;

    if (this.resType6 === 1) {
      console.log("ta bien");
      this.completed[index] = true;
    }else{
      console.log("ta mal");
    }
  }

}
