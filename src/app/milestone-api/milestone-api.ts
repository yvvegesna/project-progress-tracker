
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Milestone, MilestoneRecord } from '../services/milestone';

@Component({
  selector: 'app-milestone-api',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './milestone-api.html',
  styleUrl: './milestone-api.css'
})
export class MilestoneApi implements OnInit {
  milestones: MilestoneRecord[] = [];
  message = '';

  milestoneForm = new FormGroup({
    milestoneName: new FormControl(''),
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

    this.message = '';

    this.milestoneService.submitMilestone(name, status).subscribe({
      next: (response) => {
        this.message = response.message;
        this.cdr.markForCheck();
        console.log('POST successful:', response);
      },
      error: (error) => {
        this.message = 'Milestone submission failed.';
        this.cdr.markForCheck();
        console.error('Error submitting milestone:', error);
      }
    });
  }
}
