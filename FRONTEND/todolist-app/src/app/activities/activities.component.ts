import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit{
  @Input() activities: Activity[] = [];
  @Output() editItemEvent = new EventEmitter<number>();

  constructor(
    private activityService: ActivitiesService
  ){}

  ngOnInit() {
    this.getActivities();
  }

  getActivities(){
    this.activityService.getActivities()
    .then((response: any) => {
      if(response['code'] != 0){
        let activitiesList:Activity[] = response['msg'] ?? [];
        this.activities = activitiesList;
      }else{
        console.log(response['msg']);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  editActivity(id: number){
    this.editItemEvent.emit(id);
  }

  deleteActivity(id: number): void{
    this.activityService.deleteActivity(id).then((data: any) => {
      if(data['code'] != 0){
        this.getActivities();
      }
    })
    .catch(err => {
      console.log({"code": 0, "msg": "Ha ocurrido un error al comunicarse con el servidor. Error: " + err});
    })
  }

  doActivity(id:number, checked: boolean){
    this.activityService.doActivity(id, checked).then((response: any) => {
      if(response['code'] != 0){
        this.getActivities();
      }
    })
    .catch(err => {
      console.log({"code": 0, "msg": "Ha ocurrido un error al comunicarse con el servidor. Error: " + err});
    })
  }
}
