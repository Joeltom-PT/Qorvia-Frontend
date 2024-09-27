export interface IUserAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  statusCode: number;
  message: string | null;
  data: IUser;
}

export interface IOtpRequest {
  otp: string;
  email: string;
}

export interface IOtpResponse {
  statusCode: number;
  message: string | null;
  data: OtpResponseData;
}

export interface OtpResponseData{
  email: string;
  verificationStatus: string;
}

export interface IResendOTPRequest {
  email : string;
}

export interface resendOTPResponse {
  statusCode: number;
  message : string | null;
  data?: String;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IloginUserResponse {
  username: string;
  email: string;
  role: string;
  verificationStatus: string;
  status: string;
}

export interface IUser {
   username: string;
   email: string;
   role: string;
   verificationStatus: string;
   status: string;
   pro_img?: string | null;
}

export interface IUserState {
  loading: boolean;
  isLogged: boolean;
  error: string | null;
  success: boolean | null;
  user: IUser | null;
}

export interface userDataRequest {
  email: string;
}