import { Component } from '@angular/core';
import { ActivitiesComponent } from '../activities/activities.component';
import { ActivitiesService } from '../activities.service';
import { Activity } from '../activity';
import { AdvicesComponent } from '../advices/advices.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ActivitiesComponent, AdvicesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  activities: Activity[] = [];
  editValue:Activity|undefined;
  errorMsgs = {
    add: false,
    edit: false
  }

  constructor(
    private activityService: ActivitiesService,
    private authService: AuthService
  ){}

  logout(){
    this.authService.logout();
  }

  showTecla(event:KeyboardEvent, detail: string){
    if(event.key == 'Enter'){
      this.addActivity(detail);
    }
  }

  onEdit(id: number){
    this.activityService.getActivity(id).then((response: any) => {
      if(response['code'] != 0 && response['msg'] != null){
        this.editValue = response['msg'];
      }
    })
  }

  getActivities(): void{
    this.activityService.getActivities().then((response: any) => {
      if(response['code'] != 0){
        let activitiesList:Activity[] = response['msg'] ?? [];
        this.activities = activitiesList;
      }else{
        console.log(response['msg']);
      }
    }).catch(err => {
      console.log(err)
    })
  }
  
  addActivity(detail: string){
    if(detail.trim()!==""){
      this.errorMsgs['add'] = false;
      this.activityService.addActivity(detail).then((data: any) => {
        if(data['code'] != 0){
          this.getActivities();
        }
      })
      .catch(err => {
        console.log({"code": 0, "msg": "Ha ocurrido un error al comunicarse con el servidor. Error: " + err});
      })
    }else{
      this.errorMsgs['add'] = true;
    }
  }

  editActivity(id: number, detail: string){
    if(detail.trim()!==""){
      this.errorMsgs['edit'] = false;
      this.editValue = undefined;
      this.activityService.editActivity(id, detail).then((data: any) => {
        if(data['code'] != 0){
          this.getActivities();
        }
      })
      .catch(err => {
        console.log({"code": 0, "msg": "Ha ocurrido un error al comunicarse con el servidor. Error: " + err});
      })
    }else{
      this.errorMsgs['edit'] = true;
    }
  }
}
