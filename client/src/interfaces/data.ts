export interface IUser {
  id: string;
  email: string;
  isActivated: boolean;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  //   refreshToken: string;
}
