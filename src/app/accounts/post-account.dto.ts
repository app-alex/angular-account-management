import { Application } from '../applications/application.model';

export interface PostAccountDto {
  username: string;
  email: string;
  password: string;
  application: Application | null;
}
