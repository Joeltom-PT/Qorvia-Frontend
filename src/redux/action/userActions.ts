import { createAsyncThunk } from "@reduxjs/toolkit";
import { IForgotPasswordRequest, IForgotPasswordResetRequest, ILoginRequest, IloginUserResponse, IOtpRequest, IOtpResponse, IPasswordChangeRequest, IRegisterRequest, IRegisterResponse, IResendOTPRequest, IUser, IUserProfileUpdateRequest, resendOTPResponse, userDataRequest } from "../../interfaces/user";
import axiosInstance from "../../axios/axiosInstance";
import { userEndPoints } from "../../services/endpoints/endPoints";
import { AxiosError } from "axios";

export const signUp = createAsyncThunk<IRegisterResponse, IRegisterRequest>(
    'user/register',
    async (userData: IRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(userEndPoints.signup, userData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message || 'Signup failed');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const otpVerify = createAsyncThunk<IOtpResponse, IOtpRequest>(
    'user/verifyOtp',
    async (OtpData: IOtpRequest, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(userEndPoints.verifyOTP, OtpData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'OTP verification failed');
            } 
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const loginUser = createAsyncThunk<IloginUserResponse, ILoginRequest>(
    'user/loginUser',
    async (loginData : ILoginRequest, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(userEndPoints.login, loginData);
            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                
                return rejectWithValue(error.request?.data || 'Login Error');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

export const resendOtp = createAsyncThunk<resendOTPResponse, IResendOTPRequest> (
    'user/resendOTP',
    async (resendOtpData : IResendOTPRequest, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(userEndPoints.resendOTP, resendOtpData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.request?.data || 'Resend OTP failed.')
            }
            return rejectWithValue('And unknown error ocuurred'); 
        }
    }
)


export const fetchUserData = createAsyncThunk<IUser, userDataRequest>(
    'user/userDetails',
    async (userDataRequest: userDataRequest, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(userEndPoints.getUserData, {
          params: { email: userDataRequest.email }
        });
        console.log(response, 'response in slice');
        return response.data; 
      } catch (err) {
        const axiosError = err as AxiosError;
        console.log(axiosError);
        return rejectWithValue(axiosError.response?.data || 'Failed to fetch user data');
      }
    }
);


export const logoutUser = createAsyncThunk<void, void>(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post(userEndPoints.logout); 
            return; 
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Logout failed');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);


export const passwordReset = createAsyncThunk<void, IPasswordChangeRequest>(
    'user/passwordChangeRequest',
    async (IPasswordChangeRequest, { rejectWithValue }) => {
        try {
            await axiosInstance.put(userEndPoints.passwordReset, IPasswordChangeRequest); 
            return; 
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Password change request failed. Try again.');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const changeAboutInformation = createAsyncThunk<IUserProfileUpdateRequest, IUserProfileUpdateRequest>(
    'user/userProfileUpdate',
    async (IUserProfileUpdateRequest, { rejectWithValue }) => {
        try {
            await axiosInstance.put(userEndPoints.changeProfileInfo, IUserProfileUpdateRequest); 
            return IUserProfileUpdateRequest; 
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'About section change request failed. Try again.');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);


export const forgotPasswordRequest = createAsyncThunk<void, IForgotPasswordRequest>(
    'user/forgotPasswordRequest',
    async (IForgotPasswordRequest, { rejectWithValue }) => {
      try {
        await axiosInstance.post(userEndPoints.forgotPassword, IForgotPasswordRequest);
        return;
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data || 'Forgot password request failed. Try again.');
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  );

  export const forgotPasswordReset = createAsyncThunk<void, IForgotPasswordResetRequest>(
    'user/forgotPasswordReset',
    async (data, { rejectWithValue }) => {
      try {
        await axiosInstance.post(userEndPoints.forgotPasswordReset, data);
        return;
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data || 'Forgot password reset request failed. Try again.');
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  );