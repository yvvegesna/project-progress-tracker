
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Milestone, MilestoneRecord } from '../services/milestone';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-milestone-tracker',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './milestone-tracker.html',
  styleUrl: './milestone-tracker.css',
})
export class MilestoneTracker implements OnInit {

  milestones: MilestoneRecord[] = [];

  milestoneForm = new FormGroup({
    milestoneName: new FormControl(''),
    dueDate: new FormControl(''),
    status: new FormControl('Not Started')
  });

  constructor(
    private milestoneService: Milestone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.milestoneService.getMilestones().subscribe({
      next: (data) => {
        this.milestones = data;
        this.cdr.markForCheck();
        console.log('Milestones retrieved from Express:', data);
      },
      error: (error) => {
        console.error('Error retrieving milestones:', error);
      }
    });
  }

  onSubmit(): void {
    const name = this.milestoneForm.value.milestoneName || '';
    const status = this.milestoneForm.value.status || '';

    this.milestoneService.submitMilestone(name, status).subscribe({
      next: (response) => {
        console.log('POST successful:', response);
        alert(response.message);
      },
      error: (error) => {
        console.error('Error submitting milestone:', error);
        alert('Milestone submission failed.');
      }
    });
  }
}
