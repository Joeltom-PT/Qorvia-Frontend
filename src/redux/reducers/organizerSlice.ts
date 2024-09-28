import { createSlice } from "@reduxjs/toolkit";
import { IOrganizerState } from "../../interfaces/organizer";
import { logoutOrganizer, organizerLogin, OrganizerRegister } from "../action/organizerActions";


const initialState: IOrganizerState = {
    loading: false,
    isLogged: false,
    error: null,
    success: null,
    profile : null,
};

export const organizerSlice = createSlice({
    name: "organizer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Organizer Registration
            .addCase(OrganizerRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(OrganizerRegister.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(OrganizerRegister.rejected, (state) => {
                state.loading = false;
            })
            // Organization Login
            .addCase(organizerLogin.pending, (state : IOrganizerState) => {
                state.loading = true;
            })
            .addCase(organizerLogin.fulfilled, (state : IOrganizerState, action) => {
                state.loading = false;
                state.profile = action.payload.data;
                state.isLogged = true;
            })
            .addCase(organizerLogin.rejected, (state : IOrganizerState) => {
                state.loading = false;
            })
            // Organizer Logout
            .addCase(logoutOrganizer.pending, (state : IOrganizerState) => {
               state.loading = true;
            })
            .addCase(logoutOrganizer.fulfilled, (state: IOrganizerState) => {
                state.isLogged = false;
                state.profile = null;
                state.loading  = false;
            })
            .addCase(logoutOrganizer.rejected, (state : IOrganizerState) => {
                state.loading = false;
            })
    },
});


export default organizerSlice.reducer;