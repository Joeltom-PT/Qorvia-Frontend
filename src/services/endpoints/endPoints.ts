import { IOrganizerEndPoints, IUserEndPoints } from "./IEndPoints";

export const userEndPoints: IUserEndPoints = {
    signup: '/account/auth/user/register',
    verifyOTP: '/account/auth/user/verifyEmail',
    resendOTP: '/notification/resendOtp',
    login: '/account/auth/user/login',
    logout: '/account/auth/user/logout',
    getUserData: '/account/user/getUserData'
};


export const organizerEndPoints: IOrganizerEndPoints = {
    register: '/account/organizer/register',
    login: '/account/organizer/login',
    logout: '/account/auth/user/logout',
};

