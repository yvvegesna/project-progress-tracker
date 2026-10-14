import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css'
})
export class ProgressNotes {
 progressNotesForm = new FormGroup({
  projectCode: new FormControl(''),
  projectName: new FormControl(''),
  date: new FormControl(''),
  currentStatus: new FormControl('On Track'),
  teamMember: new FormControl(''),
  progressNote: new FormControl('')
});
invalidProjectCode = false;

onProjectCodeChange() {
  const code = this.progressNotesForm.get('projectCode')?.value;

  const projects: { [key: string]: string } = {
    'PPT101': 'Project Progress Tracker',
    'WEB202': 'Website Redesign',
    'APP303': 'Mobile Application Development',
    'DATA404': 'Data Analytics Dashboard'
  };

  const projectName = projects[code || ''] || '';
  this.progressNotesForm.get('projectName')?.setValue(projectName);
  this.invalidProjectCode = !!code && !projectName;
}

}