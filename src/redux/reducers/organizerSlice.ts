import { createSlice } from "@reduxjs/toolkit";
import { IOrganizerState } from "../../interfaces/organizer";
import { OrganizerRegister } from "../action/organizerActions";


const initialState: IOrganizerState = {
    loading: false,
    isLogged: false,
    error: null,
    success: null,
    profile : null,
};

export const organizerSlice = createSlice({
    name: "user",
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
    },
});


export default organizerSlice.reducer;