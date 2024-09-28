import { IAdminEndPoints, IOrganizerEndPoints, IUserEndPoints } from "./IEndPoints";

export const userEndPoints: IUserEndPoints = {
    signup: '/account/auth/register',
    verifyOTP: '/account/auth/verifyEmail',
    resendOTP: '/notification/resendOtp',
    login: '/account/auth/login',
    logout: '/account/auth/logout',
    getUserData: '/account/user/getUserData'
};


export const organizerEndPoints: IOrganizerEndPoints = {
    register: '/account/auth/organizerRegister',
    login: '/account/auth/organizerLogin',
    logout: '/account/auth/logout',
};


export const adminEndPoints: IAdminEndPoints = {
    getAllUsers: '/account/admin/getAllUsers'
}