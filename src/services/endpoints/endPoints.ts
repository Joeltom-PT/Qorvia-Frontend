import { IAdminEndPoints, IOrganizerEndPoints, IUserEndPoints } from "./IEndPoints";

export const userEndPoints: IUserEndPoints = {
    signup: '/account/auth/register',
    verifyOTP: '/account/auth/verifyEmail',
    resendOTP: '/notification/resendOtp',
    login: '/account/auth/login',
    logout: '/account/auth/logout',
    forgotPassword: '/account/auth/forgotPasswordRequest',
    forgotPasswordReset: '/account/auth/forgotPasswordReset',

    passwordReset: '/account/user/passwordReset',
    getUserData: '/account/user/getUserData',
    changeProfileInfo: '/account/user/changeProfileInfo'
};


export const organizerEndPoints: IOrganizerEndPoints = {
    register: '/account/auth/organizerRegister',
    emailVerification: '/account/auth/organizerEmailVerify',
    emailVerificationTokenVerify: '/account/auth/organizerVerificationToken',
    login: '/account/auth/organizerLogin',
    logout: '/account/auth/logout',
    // Not completed ..........
    passwordReset: '/account/auth/passwordReset',
    forgotPassword: '/account/auth/forgotPasswordRequest',
    forgotPasswordReset: '',
    //.........................

    //Event management endPoints 
    eventCategoryReqeust: '/event/categoryRequest',
    createOnlineEvent: '/event/createOnlineEvent'
};


export const adminEndPoints: IAdminEndPoints = {
    getAllUsers: '/account/admin/getAllUsers',
    blockOrUnblockUser: '/account/admin/blockOrUnblockUser',
    getAllOrganizers: 'account/admin/getAllOrganizers',
    getOrganizerDetails: '/account/admin/getOrganizerDetails',
    changeOrganizerStatus: 'account/admin/changeOrganizerStatus',

    // Event Management endpoints
    getAllEventCategories: '/event/getAllEventCategories',
    changeEventCategoryStatus: '/event/changeCategoryStatus'
    
    
}