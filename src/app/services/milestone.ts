

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MilestoneRecord {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class Milestone {
  private apiUrl = 'http://localhost:8000/milestones';

  constructor(private http: HttpClient) {}

  getMilestones(): Observable<MilestoneRecord[]> {
    return this.http.get<MilestoneRecord[]>(this.apiUrl);
  }

  submitMilestone(name: string, status: string): Observable<any> {
    return this.http.post(this.apiUrl, { name, status });
  }
}
