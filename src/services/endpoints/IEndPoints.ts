

export interface IEndPoints {
    login: string;
    logout: string;
    passwordReset: string;
    forgotPassword: string;
    forgotPasswordReset: string;
}

export interface IUserEndPoints extends IEndPoints {
    signup: string;
    verifyOTP: string;
    resendOTP: string;
    getUserData: string;
    changeProfileInfo: string;
}

export interface IOrganizerEndPoints extends IEndPoints {
    register: string;
    emailVerification: string;
    emailVerificationTokenVerify: string;

    //Event management endPoints 
    eventCategoryReqeust: string;
    createOnlineEvent: string;
}

export interface IAdminEndPoints {
    getAllUsers: string;
    blockOrUnblockUser: string;
    getAllOrganizers: string;
    getOrganizerDetails: string;
    changeOrganizerStatus: string;

    // Event management endpoints
    getAllEventCategories: string;
    changeEventCategoryStatus: string;

}