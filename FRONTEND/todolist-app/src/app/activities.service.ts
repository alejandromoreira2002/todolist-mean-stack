import { Injectable, inject } from '@angular/core';
import { Responses } from './responses';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private activitiesUrl = 'http://localhost:3000/api/activities';
  router:Router = inject(Router)
  
  constructor() {}

  async tryConnection(): Promise<any>{
    /*try {
      const response = await fetch('http://localhost:3000/api');
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error de fetch:', error);
      throw new Error('Ocurrió un error al obtener los datos. Por favor, inténtalo de nuevo más tarde.');
    }*/

    const response = await fetch('http://localhost:3000/api')
    return await response.json();
    
  }

  async getActivities(): Promise<any>{
    let token = localStorage.getItem('authKey') ?? '';
    if(!token){
      this.router.navigate(['/login'])
    }else{
      const response = await fetch(this.activitiesUrl, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    }
  }

  async getActivity(id: number): Promise<any>{
    let token = localStorage.getItem('authKey') ?? '';
    if(!token){
      this.router.navigate(['/login'])
    }else{
      const response = await fetch(`${this.activitiesUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    }
  }

  async addActivity(detail: string): Promise<any>{
    let token = localStorage.getItem('authKey') ?? '';
    if(!token){
      this.router.navigate(['/login'])
    }else{
      const response = await fetch(`${this.activitiesUrl}`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'detail': detail})
      })
      return await response.json();
    }
  }

  async editActivity(id: number, newDetail: string): Promise<any>{
    let token = localStorage.getItem('authKey') ?? '';
    if(!token){
      this.router.navigate(['/login'])
    }else{
      const response = await fetch(`${this.activitiesUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'detail': newDetail})
      })
      return await response.json();
    }
  }

  async deleteActivity(id: number): Promise<any>{
    let token = localStorage.getItem('authKey') ?? '';
    if(!token){
      this.router.navigate(['/login'])
    }else{
      const response = await fetch(`${this.activitiesUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      return await response.json();
    }
  }

  async doActivity(id: number, checked: boolean): Promise<any>{
    let token = localStorage.getItem('authKey') ?? '';
    if(!token){
      this.router.navigate(['/login'])
    }else{
      const response = await fetch(`${this.activitiesUrl}/do/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({checked: checked})
      })
      return await response.json();
    }
  }
}
