export interface IOnlineEventData {
    detail: IOnlineEventDetail,
    ticket: IOnlineEventTicket,
    setting: IOnlineEventSetting;
}

export interface IOnlineEventDetail {
    name: string;
    category: string;
    description: string;
    banner_img: string;
    type: string;
    eventDateTime: IEventDateTime[];
    participants?: IEventParticipant[];
    guides?: IEventGuide[];
}

export interface IEventParticipant {
    username: string;
    role: string;
    profile_img: string;
}

export interface IEventGuide {
    heading: string;
    content: string;
}

export interface IEventDateTime {
    date: string;
    startTime: string;
    endTime: string;
}


export interface IOnlineEventTicket {
    type: string;
    totalTickets: number;
    price?: number;
    discountType?: string;
    discount?: number;
}

export interface IOnlineEventSetting {
    setting1: boolean;
    setting2: boolean;
    setting3: boolean;
    bookingStartDateAndTime: string;
    bookingEndDateAndTime: string;
    refundPolicy: string;
    refundAmount: number;
}