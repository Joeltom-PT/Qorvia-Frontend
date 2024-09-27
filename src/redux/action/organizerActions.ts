import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrganizerRegisterRequest, IOrganizerRegisterResponse } from "../../interfaces/organizer";
import axiosInstance from "../../axios/axiosInstance";
import { AxiosError } from "axios";
import { organizerEndPoints } from "../../services/endpoints/endPoints";



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
