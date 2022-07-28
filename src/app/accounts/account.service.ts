import { PostAccountDto } from './post-account.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from './account.model';
import { ModifyAccountDto } from './modify-account.dto';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.API_URL + '/accounts');
  }

  public getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(
      environment.API_URL + '/accounts/' + accountId
    );
  }

  public postAccount(account: PostAccountDto): Observable<Account> {
    return this.http.post<Account>(environment.API_URL + '/accounts', {
      ...account,
    });
  }

  public deleteAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(
      environment.API_URL + '/accounts/' + accountId
    );
  }

  public modifyAccount(
    accountId: string,
    modifyAccountDto: ModifyAccountDto
  ): Observable<Account> {
    return this.http.patch<Account>(
      environment.API_URL + '/accounts/' + accountId,
      {
        ...modifyAccountDto,
      }
    );
  }
}
