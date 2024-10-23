import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { FetchAllOrganizersParams, FetchAllUsersParams, IAdminSideOrganizerDetailReponse, IAdminSideOrganizerDetailReqeust, IChangeEventCategoryRequest, IGetAllCategoriesResponse, IGetAllEventCategoriesRequest, IGetAllOrganizersResponse, IGetAllUsersResponse, IOrganizerStatusChangeRequest } from "../../interfaces/admin";
import { AxiosError } from "axios";
import { adminEndPoints } from "../../services/endpoints/endPoints";
import { IApiResponse } from "../../interfaces/global";
  

export const getAllUsers = createAsyncThunk<IGetAllUsersResponse, FetchAllUsersParams>(
    'admin/fetchAllUsers',
    async ({ page, size , search }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(adminEndPoints.getAllUsers, {
          params: { page, size , search },
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

  export const getAllOrganizers = createAsyncThunk<IGetAllOrganizersResponse, FetchAllOrganizersParams> (
    'admin/fetchAllOrganizers',
    async ({ page, size , search , status }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(adminEndPoints.getAllOrganizers, {
          params: { page, size , search, status },
        });
        console.info(response)
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error)
          return rejectWithValue(error.response?.data.message || 'Fetch all organizers failed.');
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  )

  export const getOrganizerDetails = createAsyncThunk<IAdminSideOrganizerDetailReponse, IAdminSideOrganizerDetailReqeust> (
    'admin/fetchOrganizerDetails',
    async ({ id }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`${adminEndPoints.getOrganizerDetails}/${id}`);
        console.info(response)
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error)
          return rejectWithValue(error.response?.data.message || 'Fetch organizer failed.');
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  )

  export const changeOrganizerStatus = createAsyncThunk<IApiResponse<string>, { id: string; data: IOrganizerStatusChangeRequest }>(
    'admin/changeOrganizerStatus',
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`${adminEndPoints.changeOrganizerStatus}/${id}`, data);
  
        const responseData: IApiResponse<string> = response.data;
        return responseData;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Axios error:', error); 
          return rejectWithValue(error.response?.data.message || 'An error occurred while changing the status.');
        }
        return rejectWithValue('An unknown error occurred while changing the status.');
      }
    }
  );

  export const changeUserStatus = createAsyncThunk<IApiResponse<string>, string>(
    'admin/changeUserStatus',
    async (email, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(adminEndPoints.blockOrUnblockUser, { email });
    
        const responseData: IApiResponse<string> = response.data;
        return responseData;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Axios error:', error); 
          return rejectWithValue(error.response?.data.message || 'An error occurred while changing the status.');
        }
        return rejectWithValue('An unknown error occurred while changing the status.');
      }
    }
  );

  
  export const getAllEventCategories = createAsyncThunk<IGetAllCategoriesResponse, IGetAllEventCategoriesRequest>(
    'admin/getAllEventCategories',
    async (request, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(adminEndPoints.getAllEventCategories, {
          params: request
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data || 'Fetching categories failed.');
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  );


  export const updateCategoryStatus = createAsyncThunk<any, IChangeEventCategoryRequest>(
    'admin/updateCategoryStatus',
    async (request, { rejectWithValue }) => {
        try {
            console.log('Requesting update with:', request); // Add this line
            const response = await axiosInstance.put(`${adminEndPoints.changeEventCategoryStatus}/${request.id}`, null, {
                params: { status: request.status }
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Updating category status failed.');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);
