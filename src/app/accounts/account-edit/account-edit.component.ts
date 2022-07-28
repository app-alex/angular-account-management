import { PostAccountDto } from './../post-account.dto';
import { Account } from './../account.model';
import { AccountService } from './../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Application } from './../../applications/application.model';
import { ApplicationService } from './../../applications/application.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModifyAccountDto } from '../modify-account.dto';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit, OnChanges {
  @Input() selectedEditAccount!: Account;
  @Output() accountSaved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  public applications: Application[] = [];
  public accountForm!: FormGroup;

  constructor(
    private applicationService: ApplicationService,
    private accountService: AccountService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.applications = await firstValueFrom(
      this.applicationService.getApplications()
    );
  }

  public ngOnChanges(): void {
    this.accountForm = new FormGroup({
      applicationName: new FormControl(
        this.selectedEditAccount.application
          ? this.selectedEditAccount.application.name
          : null,
        Validators.required
      ),
      username: new FormControl(this.selectedEditAccount.username ?? null),
      email: new FormControl(this.selectedEditAccount.email ?? null),
      password: new FormControl(this.selectedEditAccount.password ?? null),
    });
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

    const modifyAccountDto: ModifyAccountDto = {
      application,
      username,
      email,
      password,
    };

    await firstValueFrom(
      this.accountService.modifyAccount(
        this.selectedEditAccount.id,
        modifyAccountDto
      )
    );
    this.accountSaved.emit();
  }

  public onCancel() {
    this.canceled.emit();
  }
}
