import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEmailVerificationRequest, IEventCategoryReqeust, IOrganizerLoginRequest, IOrganizerLoginResponse, IOrganizerRegisterRequest, IOrganizerRegisterResponse, IOrganizerVerificationResponse, IVerifyOrganzierRequest } from "../../interfaces/organizer";
import axiosInstance from "../../axios/axiosInstance";
import { AxiosError } from "axios";
import { organizerEndPoints, userEndPoints } from "../../services/endpoints/endPoints";
import { toast } from "react-toastify";
import { IOnlineEventData } from "../../interfaces/event";



export const OrganizerRegister = createAsyncThunk<IOrganizerRegisterResponse, IOrganizerRegisterRequest>(
    'organizer/register',
    async (formData: IOrganizerRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(organizerEndPoints.register, formData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response);
                return rejectWithValue({
                    status: error.response?.status,
                    message: error.response?.data.message || 'Organizer Registration Failed.',
                });
            }
            return rejectWithValue({
                status: 500,
                message: 'Organizer Registration Failed.'
            });
        }
    }
);


export const organizerLogin = createAsyncThunk<IOrganizerLoginResponse, IOrganizerLoginRequest>(
 'organizer/login',
    async (formData: IOrganizerLoginRequest, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(organizerEndPoints.login, formData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error.response);
            const errorMessage = error.response?.data.message || 'Organizer Login Failed.';
            toast.error(errorMessage)
            return rejectWithValue({
                status: error.response?.status,
                message: errorMessage,
            });
        }
        return rejectWithValue({
            status: 500,
            message: 'Organizer Login Failed.'
        });
    }
}
);


export const logoutOrganizer = createAsyncThunk<void, void>(
    'organizer/logout',
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

export const emailVerification = createAsyncThunk<void, IEmailVerificationRequest>(
    'organizer/emailVerify',
    async ({ email }, { rejectWithValue }) => {
        try {
            await axiosInstance.post(organizerEndPoints.emailVerification, { email });
            return;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Verification Request send failed');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);


export const verifyOrganizer = createAsyncThunk<IOrganizerVerificationResponse, IVerifyOrganzierRequest>(
    'organizer/verifyOrganizer',
    async (request, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<IOrganizerVerificationResponse>(
                organizerEndPoints.emailVerificationTokenVerify,
                request
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Verification failed, try again.');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);


export const eventCategoryReqeust = createAsyncThunk<any, IEventCategoryReqeust>(
    'organizer/eventCategoryReqeust',
    async (request, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                organizerEndPoints.eventCategoryReqeust,
                request
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Category creation failed. Try again.');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);


export const createOnlineEvent = createAsyncThunk<any, IOnlineEventData >(
    'organizer/createOnlineEvent',
    async (request, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                organizerEndPoints.createOnlineEvent,
                request
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Online event creation failed. Try again.');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);