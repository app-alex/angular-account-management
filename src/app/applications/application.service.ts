import { InsertApplicationDto } from './insert-application.dto';
import { Application } from './application.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  public constructor(private http: HttpClient) {}

  public getApplications() {
    return this.http.get<Application[]>(environment.API_URL + '/applications');
  }

  public insertApplication(insertApplicationDto: InsertApplicationDto) {
    return this.http.post<Application>(environment.API_URL + '/applications', {
      ...insertApplicationDto,
    });
  }

  public getApplicationIconUrl(applicationId: string) {
    return environment.API_URL + '/applications/icon/' + applicationId;
  }

  public insertApplicationIcon(applicationId: string, icon: FormData) {
    return this.http.post(
      environment.API_URL + '/applications/upload/icon/' + applicationId,
      icon
    );
  }

  public deleteApplication(applicationId: string) {
    return this.http.delete<void>(
      environment.API_URL + '/applications/' + applicationId
    );
  }
}
