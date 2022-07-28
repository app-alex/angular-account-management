export interface UserData {
  accessToken: string;
  tokenExpirationDate: number;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
}
