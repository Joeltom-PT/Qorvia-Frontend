import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { IGetAllUsersResponse } from "../../interfaces/admin";
import { AxiosError } from "axios";
import { adminEndPoints } from "../../services/endpoints/endPoints";


interface FetchAllUsersParams {
    page: number;
    size: number;
}
  

export const getAllUsers = createAsyncThunk<IGetAllUsersResponse, FetchAllUsersParams>(
    'organizer/fetchAllUsers',
    async ({ page, size }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(adminEndPoints.getAllUsers, {
          params: { page, size },
        });
        console.info(response)
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error)
          return rejectWithValue(error.response?.data.message || 'Fetch all users failed.');
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  );