
export interface IAdminState {
    loading: boolean;
}

export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string; 
    verificationStatus: string; 
    status: string; 
    pro_img: string;
}

export interface AllUsersWithPagination {
    users: UserData[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}

export interface IGetAllUsersResponse {
    statusCode: number;
    message: string;
    data: AllUsersWithPagination; 
}

export interface OrganizerData {
    id: number;
    name: string;
    email: string;
    verificationStatus: string;
    registerRequestStatus: string;
    status: string;
    role: string;
}


export interface AllOrganizersWithPagination {
    organizers: OrganizerData[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}

export interface IGetAllOrganizersResponse {
    statusCode : number;
    message: string;
    data: AllOrganizersWithPagination;
}

export interface FetchAllUsersParams {
    page: number;
    size: number;
    search: string;
 }

 export interface FetchAllOrganizersParams {
    page: number;
    size: number;
    search: string;
    status: string;
 }

 export interface IAdminSideOrganizerDetail {
    id: number;
    organizationName: string;
    email: string;
    phone: string;
    website?: string;
    address: string;
    address2?: string;
    city: string;
    country: string;
    state: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    profileImage?: string;
    about?: string;
    totalEvents: number;
    registrationStatus: string;
    status: string;
    verificationStatus: string;
}

export interface IAdminSideOrganizerDetailReponse {
    statusCode : number;
    message: string;
    data: IAdminSideOrganizerDetail;
}

export interface IAdminSideOrganizerDetailReqeust {
    id: number;
}

export interface IOrganizerStatusChangeRequest {
    registrationStatus: string;
    status: string;
}

export interface IEventCategory {
    id: string;
    name: string;
    description: string;
    status: string;
}

export interface IGetAllCategoriesResponse {
    categories: IEventCategory[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}

export interface IGetAllEventCategoriesRequest {
    page?: number;
    size?: number;
    search?: string;
    status?: string;
  }

export interface IChangeEventCategoryRequest {
    id: string;
    status: string;
}