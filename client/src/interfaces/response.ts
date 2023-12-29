import { IUser } from './data';

export interface AuthResponse {
  accessToken: string;
  //   refreshToken: string;
  user: IUser;
}
