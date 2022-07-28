import { Application } from '../applications/application.model';

export interface Account {
  id: string;
  username: string;
  email: string;
  password: string;
  application: Application;
}
