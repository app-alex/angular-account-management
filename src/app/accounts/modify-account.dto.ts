import { Application } from './../applications/application.model';

export class ModifyAccountDto {
  application?: Application | null;
  username?: string;
  email?: string;
  password?: string;
}
