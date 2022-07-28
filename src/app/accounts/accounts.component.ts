import { ApplicationService } from './../applications/application.service';
import { firstValueFrom } from 'rxjs';
import { AccountService } from './account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from './account.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  public accounts: Account[] = [];
  public isAddMode = false;
  public isEditMode = false;
  public selectedEditAccount!: Account;

  public displayedColumns = [
    'Application',
    'Username',
    'Email',
    'Password',
    'Actions',
  ];

  public constructor(
    private accountService: AccountService,
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.setAccounts();
  }

  private async setAccounts(): Promise<void> {
    this.accounts = await firstValueFrom(this.accountService.getAccounts());
  }

  public onAccountSaved() {
    this.isAddMode = false;
    this.isEditMode = false;
    this.setAccounts();
  }

  public onAddAccount() {
    this.isEditMode = false;
    this.isAddMode = true;
  }

  public onEditAccount(account: Account) {
    this.isAddMode = false;
    this.selectedEditAccount = account;
    this.isEditMode = true;
  }

  public onCancel() {
    this.isAddMode = false;
    this.isEditMode = false;
  }

  public async onDeleteAccount(accountId: string) {
    await firstValueFrom(this.accountService.deleteAccount(accountId));
    this.setAccounts();
  }

  public getApplicationIconUrl(applicationId: string) {
    return this.applicationService.getApplicationIconUrl(applicationId);
  }

  public getHiddenPassword(password: string): string {
    let hiddenPassword = '';

    if (password) {
      [...password].forEach(() => (hiddenPassword += '*'));
    }

    return hiddenPassword;
  }

  public copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    this.snackBar.open('Copied to clipboard', 'X', {
      duration: 3000,
    });
  }
}
