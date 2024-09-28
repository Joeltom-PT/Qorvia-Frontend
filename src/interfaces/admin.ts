
export interface IAdminState {
    loading: boolean;
}

export interface UserDTO {
    username: string;
    email: string;
    role: string; 
    verificationStatus: string; 
    status: string; 
    pro_img: string;
}

export interface AllUsersWithPagination {
    users: UserDTO[];
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

