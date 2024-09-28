
export interface IOrganizerState {
    loading: boolean;
    isLogged: boolean;
    error: string | null;
    success: boolean | null;
    profile: IOrganizerProfile | null;
  }
  
  export interface IOrganizerProfile {
    name: string;
    email: string;
    verificationStatus: string;
    registerRequestStatus: string;
    status: string;
    role: string;
  }

  export interface IOrganizerRegisterRequest {
    organizationName: string;
    email: string;
    password: string;
    repeatPassword: string;
    phone: number;
    website?: string; 
    address: string;
    address2?: string; 
    city: string;
    country: string;
    state: string;
    // PinCode: number;
    facebook?: string; 
    instagram?: string; 
    twitter?: string; 
    linkedin?: string; 
    youtube?: string; 
    profileImage: string;
    about: string; 
  }

  export interface IOrganizerRegisterResponse {
    statusCode: number;
    message: string;
  }

  export interface IOrganizerLoginRequest {
    email: string;
    password: string;
  }

  export interface IOrganizerLoginResponse {
    statusCode: number;
    message: string;
    data: IOrganizerProfile;
  }