import { firstValueFrom } from 'rxjs';
import { ApplicationService } from './application.service';
import { Application } from './application.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  public applications: Application[] = [];
  public isAddMode = false;
  public selectedEditApplication!: Application;

  public displayedColumns = ['Icon', 'Name', 'Actions'];

  public constructor(private applicationService: ApplicationService) {}

  public async ngOnInit(): Promise<void> {
    await this.setApplications();
  }

  private async setApplications() {
    this.applications = await firstValueFrom(
      this.applicationService.getApplications()
    );
  }

  public getApplicationIconUrl(applicationId: string) {
    return this.applicationService.getApplicationIconUrl(applicationId);
  }

  public onApplicationSaved() {
    this.isAddMode = false;
    this.setApplications();
  }

  public onAddApplication() {
    this.isAddMode = true;
  }

  public onCancel() {
    this.isAddMode = false;
  }

  public async onDeleteApplication(applicationId: string) {
    await firstValueFrom(
      this.applicationService.deleteApplication(applicationId)
    );
    this.setApplications();
  }
}
