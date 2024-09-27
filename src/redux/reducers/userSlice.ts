import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../interfaces/user";
import { fetchUserData, loginUser, logoutUser, otpVerify, resendOtp, signUp } from "../action/userActions";

const initialState: IUserState = {
    loading: false,
    isLogged: false,
    error: null,
    success: null,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Sign UP
            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(signUp.rejected, (state) => {
                state.loading = false;
            })
            // Verify OTP
            .addCase(otpVerify.pending, (state) => {
                state.loading = true;
            })
            .addCase(otpVerify.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.verificationStatus = action.payload.data.verificationStatus;
                } else {
                    console.error('User is not defined');
                }
                state.isLogged = true;
                state.loading = false; 
            })
            .addCase(otpVerify.rejected, (state) => {
                state.loading = false;
            })
            // Resend OTP
            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state) => {
                state.loading = false;
            })
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogged = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            // Google Auth
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogged = true;
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.loading = false;
            })
            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLogged = false;
                state.loading = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
