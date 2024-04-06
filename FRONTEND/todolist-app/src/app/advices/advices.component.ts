import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-advices',
  standalone: true,
  imports: [],
  templateUrl: './advices.component.html',
  styleUrl: './advices.component.scss'
})
export class AdvicesComponent implements OnInit{
  errorConnection: Boolean = false;
  loading: Boolean = true;

  constructor(
    private activityService: ActivitiesService
  ){}

  ngOnInit(){
    //let response = this.activityService.tryConnection();
    this.activityService.tryConnection().then(data => {
      this.errorConnection = false;
      this.loading = false;
    })
    .catch(error => {
      this.errorConnection = true;
      this.loading = false;
    });
    /*
    if(response['code'] === 0){
      this.errorConnection = true;
    }else{
      this.errorConnection = false;
    }*/
  }
}
