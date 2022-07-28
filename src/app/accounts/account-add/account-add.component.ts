import { PostAccountDto } from './../post-account.dto';
import { Account } from './../account.model';
import { AccountService } from './../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Application } from './../../applications/application.model';
import { ApplicationService } from './../../applications/application.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss'],
})
export class AccountAddComponent implements OnInit {
  @Output() accountSaved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  public applications: Application[] = [];
  public accountForm!: FormGroup;

  constructor(
    private applicationService: ApplicationService,
    private accountService: AccountService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.accountForm = new FormGroup({
      applicationName: new FormControl(null, Validators.required),
      username: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });

    this.applications = await firstValueFrom(
      this.applicationService.getApplications()
    );
  }

  public async onSaveAccount() {
    const application =
      this.applications.find(
        (application) =>
          application.name === this.accountForm.value.applicationName
      ) ?? null;
    const username = this.accountForm.value.username;
    const email = this.accountForm.value.email;
    const password = this.accountForm.value.password;

    const postAccount: PostAccountDto = {
      application,
      username,
      email,
      password,
    };

    await firstValueFrom(this.accountService.postAccount(postAccount));
    this.accountSaved.emit();
  }

  public onCancel() {
    this.canceled.emit();
  }
}
