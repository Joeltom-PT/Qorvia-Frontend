import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrganizerLoginRequest, IOrganizerLoginResponse, IOrganizerRegisterRequest, IOrganizerRegisterResponse } from "../../interfaces/organizer";
import axiosInstance from "../../axios/axiosInstance";
import { AxiosError } from "axios";
import { organizerEndPoints, userEndPoints } from "../../services/endpoints/endPoints";
import { toast } from "react-toastify";



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