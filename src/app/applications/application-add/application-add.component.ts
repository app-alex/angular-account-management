import { ApplicationService } from './../application.service';
import { firstValueFrom } from 'rxjs';
import { Application } from './../application.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.scss'],
})
export class ApplicationAddComponent implements OnInit {
  @Output() applicationSaved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  public applications: Application[] = [];
  public applicationForm!: FormGroup;

  private selectedFile: File | null = null;

  constructor(private applicationService: ApplicationService) {}

  async ngOnInit(): Promise<void> {
    this.applicationForm = new FormGroup({
      icon: new FormControl(null),
      name: new FormControl(null, Validators.required),
    });

    this.applications = await firstValueFrom(
      this.applicationService.getApplications()
    );
  }

  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public async onSaveApplication() {
    const iconName = this.applicationForm.value.icon;
    const name = this.applicationForm.value.name;

    const application = await firstValueFrom(
      this.applicationService.insertApplication({ name })
    );

    if (iconName && this.selectedFile) {
      const formData = new FormData();
      formData.append('icon', this.selectedFile);

      await firstValueFrom(
        this.applicationService.insertApplicationIcon(application.id, formData)
      );
    }

    this.applicationSaved.emit();
  }

  public onCancel() {
    this.canceled.emit();
  }
}
