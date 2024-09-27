

export interface IEndPoints {

    login: string;
    logout: string;
}

export interface IUserEndPoints extends IEndPoints {
    signup: string;
    verifyOTP: string;
    resendOTP: string;
    getUserData: string;
}

export interface IOrganizerEndPoints extends IEndPoints {
    register: string;
}
