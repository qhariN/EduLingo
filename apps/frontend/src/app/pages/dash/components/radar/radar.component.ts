import { Component, OnInit } from '@angular/core';
import { Progress } from 'apps/frontend/src/app/models/progress';
import { SkillService } from 'apps/frontend/src/app/services/skill.service';

@Component({
  selector: 'frontend-radar',
  templateUrl: './radar.component.html',
})
export class RadarComponent{

  progress : any = {};
  chartColors: any[] = [{backgroundColor:["#1C2871","#FFCC34", "#F74657"]}];
  demoradarChartLabels: string[] = ['LISTENING','WRITING','SPEAKING'];
  demoradarChartData: any = [{ data: [0,0,0], label: ""}];
  radarChartType: string = 'radar';

  constructor(private skillService:SkillService){
    this.skillService.getProgress().subscribe((data)=>{
      this.progress = data;
      this.demoradarChartData[0].data = [
        parseFloat(this.progress.points_listening).toFixed(2),
        parseFloat(this.progress.points_writing).toFixed(2),
        parseFloat(this.progress.points_speaking).toFixed(2)
      ]
    });    
  }
}
